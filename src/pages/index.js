

import { useEffect, useState } from 'react';
import PortfolioTable from '@/components/PortfolioTable';
import ErrorBanner from '@/components/ErrorBanner';
import './index.css';  // Importing the separate CSS file for styling

export default function HomePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch portfolio data from the API
  const fetchPortfolioData = async () => {
    try {
      const response = await fetch('/api/fetchPortfolioData');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message || 'Something went wrong while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  // UseEffect to fetch data when the component mounts
  useEffect(() => {
    fetchPortfolioData();

    const intervalId = setInterval(() => {
      fetchPortfolioData();
    }, 15000); // Refresh every 15 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container">
      {/* Show error banner if there is an error */}
      {error && <ErrorBanner message={error} />}
      
      {/* Show loading state until data is fetched */}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        // Show the Portfolio Table if data is loaded
        <PortfolioTable data={data} />
      )}
    </div>
  );
}
