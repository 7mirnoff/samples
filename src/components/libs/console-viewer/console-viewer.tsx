import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import classnames from 'classnames'
import styles from './console-viewer.module.scss'

interface ILogItem {
  id: string
  time: string
  message: string
}

export const ConsoleViewer: React.FC = () => {
  const [logs, setLogs] = useState<ILogItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleViewer = (): void => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const originalConsoleLog = console.log
    console.log = (...args: Array<string | object>): void => {
      originalConsoleLog(...args)
      const message = args
        .map((arg) => {
          if (typeof arg === 'object') {
            return JSON.stringify(arg, null, 2)
          }
          return arg.toString()
        })
        .join(' ')
      const date = new Date()
      const time = [
        date.getHours().toString().padStart(2, '0'),
        date.getMinutes().toString().padStart(2, '0'),
        date.getSeconds().toString().padStart(2, '0'),
      ].join(':')
      const id = nanoid()

      setLogs((prevLogs) => [{ id, time, message }, ...prevLogs])
      console.timeStamp(time) // Save the timestamp to the browser console
    }
    return () => {
      console.log = originalConsoleLog
    }
  }, [])

  return (
    <div className={classnames(styles.root, { [styles.root_open]: isOpen })}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className={styles.headerRow} onClick={handleToggleViewer}>
        <h2 className={styles.title}>Console Viewer</h2>
      </div>
      {logs.map((log) => (
        <div key={log.id}>
          <div className={styles.logItem}>
            <span className={styles.timeStamp}>{`${log.time}`}</span> <pre>{`${log.message}`}</pre>
          </div>
        </div>
      ))}
    </div>
  )
}
