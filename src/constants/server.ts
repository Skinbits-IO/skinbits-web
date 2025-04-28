const SERVER_URL = import.meta.env.VITE_API_URL;
export const API_BASE = import.meta.env.DEV ? '/api' : SERVER_URL;
