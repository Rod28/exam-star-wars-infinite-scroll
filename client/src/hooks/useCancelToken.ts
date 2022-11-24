import { useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
// Constants
import { ERROR_MESSAGES } from '../constants/errorMessages';

export const useCancelToken = () => {
  const axiosSource = useRef<any>(null);

  const newCancelToken = useCallback(() => {
    axiosSource.current = axios.CancelToken.source();
    return axiosSource.current.token;
  }, []);

  useEffect(
    () => () => {
      if (axiosSource.current)
        axiosSource.current.cancel(ERROR_MESSAGES.Request_canceled);
    },
    []
  );

  return { newCancelToken };
};

export default useCancelToken;
