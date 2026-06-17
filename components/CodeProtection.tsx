'use client'

import { useEffect } from 'react'

export default function CodeProtection() {
  useEffect(() => {
    // Only apply protection in production build
    if (process.env.NODE_ENV !== 'production') {
      return
    }

    // 1. Disable Right Click Context Menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }
    window.addEventListener('contextmenu', handleContextMenu)

    // 2. Disable DevTools and View Source Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 key
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault()
        return false
      }

      // Ctrl + Shift + I (Inspect) or Cmd + Option + I on Mac
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.keyCode === 73)) {
        e.preventDefault()
        return false
      }

      // Ctrl + Shift + J (Console) or Cmd + Option + J on Mac
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'j' || e.keyCode === 74)) {
        e.preventDefault()
        return false
      }

      // Ctrl + Shift + C (Inspect Element) or Cmd + Option + C on Mac
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'C' || e.key === 'c' || e.keyCode === 67)) {
        e.preventDefault()
        return false
      }

      // Ctrl + U (View Source) or Cmd + Option + U on Mac
      if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u' || e.keyCode === 85)) {
        e.preventDefault()
        return false
      }

      // Ctrl + S (Save Page) or Cmd + S on Mac
      if ((e.ctrlKey || e.metaKey) && (e.key === 'S' || e.key === 's' || e.keyCode === 83)) {
        e.preventDefault()
        return false
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    // 3. Stub Console Logs and Keep Clearing Console
    const noop = () => {}
    const originalClear = console.clear

    try {
      console.log = noop
      console.info = noop
      console.warn = noop
      console.error = noop
      console.debug = noop
    } catch (err) {}

    // Continuous console clearing
    const consoleClearInterval = setInterval(() => {
      try {
        originalClear()
      } catch (err) {}
    }, 500)

    // 4. Anti-Debugging Loop (Trigger pause if DevTools is open)
    const antiDebug = () => {
      const start = performDebugTrap()
      if (start) {
        antiDebug()
      }
    }

    const performDebugTrap = (): boolean => {
      try {
        // This will halt script execution in the browser sources/debugger tab if DevTools is open
        ;(function() {
          return function(a: any) {}
        })()
        .constructor('debugger')()
        return true
      } catch (err) {
        return false
      }
    }

    // Run the debugger trap periodically
    const antiDebugInterval = setInterval(() => {
      antiDebug()
    }, 100)

    // Cleanup listeners and intervals
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu)
      window.removeEventListener('keydown', handleKeyDown)
      clearInterval(consoleClearInterval)
      clearInterval(antiDebugInterval)
    }
  }, [])

  return null
}
