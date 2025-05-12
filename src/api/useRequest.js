import {useCallback, useState} from 'react';
import {getData} from '../utils/store';

export const useRequest = () => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const BASE_URL = 'https://schedule-server-igwd.onrender.com/api';

  const defaultHeaders = {
    'Content-type': 'application/json',
    Accept: 'application/json',
  };

  const request = useCallback(
    async (url, method = 'GET', body = null, headers = defaultHeaders) => {
      const token = await getData('token');

      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}${url}`, {
          method,
          body: body ? JSON.stringify(body) : null,
          headers: {...headers, Authorization: `Bearer ${token}`},
        });

        if (!response.ok) {
          throw new Error(`could not featch ${url}, status ${response.status}`);
        }

        const data = await response.json();

        setLoading(false);
        return data;
      } catch (e) {
        setLoading(false);
        setError(e);

        throw e;
      }
    },
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {loading, error, request, clearError};
};
