
export interface LoggerSystem {
  start: () => LoggerSystem
  stop: () => void
}

export interface Logger {
  log: (type: 'error' | 'info', payload: string) => void
}
