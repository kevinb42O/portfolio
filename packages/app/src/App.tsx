import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Character, usePointerPosition } from '@gitgotchi/shared';
import { useWebSocket } from './hooks/useWebSocket';
import "./App.css";

// Default character for now - in production, this would be selected on first run
const DEFAULT_CHARACTER = {
  type: 'copilot' as const,
  color: 'blue' as const,
  name: 'Azure'
};

function App() {
  const { position } = usePointerPosition();
  const { isConnected, lastEvent } = useWebSocket();
  const [devMode, setDevMode] = useState(false);
  const [, setCharacterState] = useState<'idle' | 'active'>('idle');

  useEffect(() => {
    // Check if we're in dev mode
    invoke<boolean>('is_dev_mode').then(setDevMode);
  }, []);

  useEffect(() => {
    // React to WebSocket events when in dev mode
    if (devMode && lastEvent) {
      console.log('Character reacting to event:', lastEvent);
      setCharacterState('active');
      
      // Return to idle after animation
      setTimeout(() => setCharacterState('idle'), 2000);
    }
  }, [devMode, lastEvent]);

  return (
    <div style={{
      width: '200px',
      height: '200px',
      overflow: 'hidden',
      background: 'transparent',
      position: 'relative'
    }}>
      <Character
        x={50}
        y={50}
        size={150}
        color={DEFAULT_CHARACTER.color}
        pointerX={position.x}
        pointerY={position.y}
        variant={DEFAULT_CHARACTER.type}
      />
      
      {/* Dev mode indicator */}
      {devMode && (
        <div style={{
          position: 'absolute',
          top: 5,
          right: 5,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: isConnected ? '#22c55e' : '#ef4444',
          boxShadow: '0 0 4px rgba(0,0,0,0.3)'
        }} />
      )}
    </div>
  );
}

export default App;
