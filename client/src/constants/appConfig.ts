export const APP_CONFIG = {
  API_URL: process.env.REACT_APP_API_URL || '',
  TIMEOUT: Number(process.env.REACT_APP_TIMEOUT_AXIOS || 20000)
};
