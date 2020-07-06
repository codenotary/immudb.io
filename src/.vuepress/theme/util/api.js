export const API_URL = 'http://localhost:7070';
export const API_CONFIG = {
    returnRejectedPromiseOnError: true,
    withCredentials: true,
    timeout: 30000,
    baseURL: API_URL,
    headers: {
        common: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Content-Type': 'application/json',
            Pragma: 'no-cache',
            Accept: 'application/json'
        }
    }
};
