import * as vscode from 'vscode';
import * as path from 'path';
import * as os from 'os';
import { spawn, exec, ChildProcess } from 'child_process';
import { GitGotchiWebSocketServer, WebSocketEvent } from './websocket';

let wsServer: GitGotchiWebSocketServer | null = null;
let outputChannel: vscode.OutputChannel;
let idleTimeout: NodeJS.Timeout | null = null;
let lastActivityTime = Date.now();
let appProcess: ChildProcess | null = null;

export function activate(context: vscode.ExtensionContext) {
  outputChannel = vscode.window.createOutputChannel('GitGotchi');
  outputChannel.appendLine('GitGotchi extension activated');

  const config = vscode.workspace.getConfiguration('gitgotchi');
  const port = config.get<number>('websocketPort', 42069);
  const idleTimeoutSeconds = config.get<number>('idleTimeout', 30);

  // Initialize WebSocket server
  wsServer = new GitGotchiWebSocketServer(port, outputChannel);
  wsServer.start();

  // Auto-launch desktop app if configured
  if (config.get<boolean>('autoLaunch', true)) {
    setTimeout(() => {
      checkAndLaunchApp();
    }, 2000); // Wait 2 seconds after VS Code starts
  }

  // Register commands
  context.subscriptions.push(
    vscode.commands.registerCommand('gitgotchi.launch', () => {
      launchDesktopApp();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('gitgotchi.reconnect', () => {
      wsServer?.stop();
      wsServer = new GitGotchiWebSocketServer(port, outputChannel);
      wsServer.start();
      vscode.window.showInformationMessage('GitGotchi WebSocket reconnected');
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('gitgotchi.toggleDevMode', () => {
      // In production, this would toggle dev mode in the desktop app
      vscode.window.showInformationMessage('Dev mode toggled');
    })
  );

  // Monitor typing activity
  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((event) => {
      if (event.document.uri.scheme === 'file') {
        lastActivityTime = Date.now();
        const language = event.document.languageId;
        sendEvent({ type: 'typing', data: { language } });
        resetIdleTimer(idleTimeoutSeconds);
      }
    })
  );

  // Monitor file saves
  context.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument((document) => {
      const filename = path.basename(document.fileName);
      sendEvent({ type: 'saving', data: { filename } });
    })
  );

  // Monitor diagnostics (errors)
  context.subscriptions.push(
    vscode.languages.onDidChangeDiagnostics((event) => {
      const errorCount = event.uris.reduce((count, uri) => {
        const diagnostics = vscode.languages.getDiagnostics(uri);
        return count + diagnostics.filter(d => d.severity === vscode.DiagnosticSeverity.Error).length;
      }, 0);
      
      if (errorCount > 0) {
        sendEvent({ type: 'error', data: { errorCount } });
      }
    })
  );

  // Monitor debug sessions
  context.subscriptions.push(
    vscode.debug.onDidStartDebugSession(() => {
      sendEvent({ type: 'debug_start' });
    })
  );

  context.subscriptions.push(
    vscode.debug.onDidTerminateDebugSession(() => {
      sendEvent({ type: 'debug_stop' });
    })
  );

  // Monitor git operations (via terminal)
  context.subscriptions.push(
    vscode.window.onDidWriteTerminalShellIntegration((event) => {
      const command = event.shellIntegration.cwd;
      // This is a simplified check - in production, we'd need better git detection
      if (command?.includes('git push')) {
        sendEvent({ type: 'git_push' });
      } else if (command?.includes('git pull')) {
        sendEvent({ type: 'git_pull' });
      }
    })
  );

  // Start idle timer
  resetIdleTimer(idleTimeoutSeconds);

  outputChannel.appendLine('GitGotchi extension fully initialized');
}

function sendEvent(event: WebSocketEvent): void {
  if (wsServer) {
    wsServer.sendEvent(event);
  }
}

function resetIdleTimer(idleTimeoutSeconds: number): void {
  if (idleTimeout) {
    clearTimeout(idleTimeout);
  }

  idleTimeout = setTimeout(() => {
    const timeSinceLastActivity = (Date.now() - lastActivityTime) / 1000;
    if (timeSinceLastActivity >= idleTimeoutSeconds) {
      sendEvent({ type: 'idle' });
    }
  }, idleTimeoutSeconds * 1000);
}

async function checkAndLaunchApp(): Promise<void> {
  const isRunning = await isAppRunning();
  if (!isRunning) {
    outputChannel.appendLine('GitGotchi desktop app not running, launching...');
    launchDesktopApp();
  } else {
    outputChannel.appendLine('GitGotchi desktop app already running');
  }
}

async function isAppRunning(): Promise<boolean> {
  return new Promise((resolve) => {
    const platform = os.platform();
    let command: string;

    if (platform === 'win32') {
      command = 'tasklist /FI "IMAGENAME eq gitgotchi.exe"';
    } else if (platform === 'darwin') {
      command = 'pgrep -x gitgotchi';
    } else {
      command = 'pgrep -x gitgotchi';
    }

    exec(command, (error, stdout) => {
      if (error) {
        resolve(false);
        return;
      }

      const isRunning = platform === 'win32' 
        ? stdout.toLowerCase().includes('gitgotchi.exe')
        : stdout.trim().length > 0;

      resolve(isRunning);
    });
  });
}

function launchDesktopApp(): void {
  try {
    const platform = os.platform();
    let appPath: string;

    // In production, these paths would be configurable or detected
    if (platform === 'win32') {
      appPath = path.join(os.homedir(), 'AppData', 'Local', 'GitGotchi', 'gitgotchi.exe');
    } else if (platform === 'darwin') {
      appPath = '/Applications/GitGotchi.app/Contents/MacOS/gitgotchi';
    } else {
      appPath = path.join(os.homedir(), '.local', 'bin', 'gitgotchi');
    }

    outputChannel.appendLine(`Attempting to launch: ${appPath}`);

    appProcess = spawn(appPath, [], {
      detached: true,
      stdio: 'ignore'
    });

    appProcess.unref();

    vscode.window.showInformationMessage('GitGotchi desktop app launched');
  } catch (error) {
    outputChannel.appendLine(`Failed to launch desktop app: ${error}`);
    vscode.window.showErrorMessage('Failed to launch GitGotchi. Please install the desktop app first.');
  }
}

export function deactivate() {
  if (wsServer) {
    wsServer.stop();
  }
  if (idleTimeout) {
    clearTimeout(idleTimeout);
  }
  outputChannel.appendLine('GitGotchi extension deactivated');
  outputChannel.dispose();
}
