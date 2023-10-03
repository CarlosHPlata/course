
export interface LoggerAdapter {
  start: () => LoggerAdapter
  log: (type: 'error' | 'info', payload: string) => void
  stop: () => void
}