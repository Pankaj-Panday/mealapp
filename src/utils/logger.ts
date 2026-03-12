const Logger = {
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${message}`, data || '');
  },
  error: (message: string, data?: any) => {
    console.log(`[ERROR] ${message}`, data || '');
  },
  warn: (message: string, data?: any) => {
    console.log(`[WARN] ${message}`, data || '');
  },
  debug: (message: string, data?: any) => {
    console.log(`[DEBUG] ${message}`, data || '');
  },
  verbose: (message: string, data?: any) => {
    console.log(`[VERBOSE] ${message}`, data || '');
  },
};

export default Logger;
