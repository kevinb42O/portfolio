import * as vscode from 'vscode';
import { WebSocketServer, WebSocket } from 'ws';

const RECONNECT_INTERVAL = 5000; // 5 seconds

export interface WebSocketEvent {
  type: 'typing' | 'idle' | 'saving' | 'error' | 'git_push' | 'git_pull' | 'debug_start' | 'debug_stop';
  data?: {
    language?: string;
    filename?: string;
    errorCount?: number;
  };
}

export class GitGotchiWebSocketServer {
  private wss: WebSocketServer | null = null;
  private client: WebSocket | null = null;
  private port: number;
  private outputChannel: vscode.OutputChannel;

  constructor(port: number, outputChannel: vscode.OutputChannel) {
    this.port = port;
    this.outputChannel = outputChannel;
  }

  start(): void {
    try {
      this.wss = new WebSocketServer({ port: this.port });

      this.wss.on('connection', (ws) => {
        this.outputChannel.appendLine(`GitGotchi desktop app connected on port ${this.port}`);
        this.client = ws;

        ws.on('message', (message) => {
          this.outputChannel.appendLine(`Received from desktop: ${message}`);
        });

        ws.on('close', () => {
          this.outputChannel.appendLine('GitGotchi desktop app disconnected');
          this.client = null;
        });

        ws.on('error', (error) => {
          this.outputChannel.appendLine(`WebSocket error: ${error.message}`);
        });
      });

      this.wss.on('error', (error) => {
        this.outputChannel.appendLine(`WebSocket server error: ${error.message}`);
      });

      this.outputChannel.appendLine(`WebSocket server started on port ${this.port}`);
    } catch (error) {
      this.outputChannel.appendLine(`Failed to start WebSocket server: ${error}`);
    }
  }

  sendEvent(event: WebSocketEvent): void {
    if (this.client && this.client.readyState === WebSocket.OPEN) {
      this.client.send(JSON.stringify(event));
      this.outputChannel.appendLine(`Sent event: ${event.type}`);
    } else {
      this.outputChannel.appendLine(`Cannot send event ${event.type} - client not connected`);
    }
  }

  isConnected(): boolean {
    return this.client !== null && this.client.readyState === WebSocket.OPEN;
  }

  stop(): void {
    if (this.client) {
      this.client.close();
      this.client = null;
    }
    if (this.wss) {
      this.wss.close();
      this.wss = null;
    }
    this.outputChannel.appendLine('WebSocket server stopped');
  }
}
