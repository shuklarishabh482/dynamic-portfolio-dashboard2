import { useState, useEffect, useMemo, useCallback } from 'react';
export default function useFetchPortfolioData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/fetchPortfolioData');
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const json = await response.json();
      setData(Array.isArray(json) ? json : []);
    } catch (err) {
      console.error('Error fetching portfolio data:', err);
      setError(err.message || 'Unexpected error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 15000); // Refresh every 15 seconds

    return () => clearInterval(intervalId);
  }, [fetchData]);

  const memoizedData = useMemo(() => data, [data]);
  const memoizedLoading = useMemo(() => loading, [loading]);
  const memoizedError = useMemo(() => error, [error]);

  return {
    data: memoizedData,
    loading: memoizedLoading,
    error: memoizedError,
  };
}
