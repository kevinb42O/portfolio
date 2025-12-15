import { useState, useEffect, useRef, useCallback } from 'react'
import type { WebSocketEvent } from '@gitgotchi/shared'

const WEBSOCKET_URL = 'ws://localhost:42069'
const RECONNECT_INTERVAL = 5000 // 5 seconds

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false)
  const [lastEvent, setLastEvent] = useState<WebSocketEvent | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<number>()

  const connect = useCallback(() => {
    try {
      const ws = new WebSocket(WEBSOCKET_URL)

      ws.onopen = () => {
        console.log('WebSocket connected')
        setIsConnected(true)
      }

      ws.onmessage = (event) => {
        try {
          const data: WebSocketEvent = JSON.parse(event.data)
          console.log('Received WebSocket event:', data)
          setLastEvent(data)
        } catch (err) {
          console.error('Failed to parse WebSocket message:', err)
        }
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
      }

      ws.onclose = () => {
        console.log('WebSocket disconnected')
        setIsConnected(false)
        wsRef.current = null

        // Attempt to reconnect after delay
        reconnectTimeoutRef.current = window.setTimeout(() => {
          console.log('Attempting to reconnect...')
          connect()
        }, RECONNECT_INTERVAL)
      }

      wsRef.current = ws
    } catch (err) {
      console.error('Failed to create WebSocket:', err)
      // Try again after delay
      reconnectTimeoutRef.current = window.setTimeout(connect, RECONNECT_INTERVAL)
    }
  }, [])

  useEffect(() => {
    connect()

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [connect])

  const sendMessage = useCallback((message: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message))
    } else {
      console.warn('WebSocket is not connected')
    }
  }, [])

  const reconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close()
    }
    connect()
  }, [connect])

  return {
    isConnected,
    lastEvent,
    sendMessage,
    reconnect,
  }
}
