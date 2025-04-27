
import fetchGoogleFinanceData from '@/lib/googleFinance';

let cachedData = null;
let lastFetched = 0;
const CACHE_TIMEOUT = 15 * 1000; // Cache timeout in milliseconds (15 seconds)

const isValidData = (data) => {
  // Basic validation checks (customize based on your data structure)
  return data.every(item => 
    item.name && item.cmp && item.peRatio && !isNaN(item.cmp) && !isNaN(item.peRatio)
  );
};

export default async function handler(req, res) {
  try {
    // Check if cached data exists and if the cache is still valid
    const currentTime = Date.now();
    if (cachedData && currentTime - lastFetched < CACHE_TIMEOUT) {
      return res.status(200).json(cachedData); // Return cached data if valid
    }

    // Fetch fresh data from Google Finance
    const data = await fetchGoogleFinanceData();
    
    // Validate fetched data
    if (!isValidData(data)) {
      console.error('Invalid data detected, falling back to default.');
      return res.status(500).json({ error: 'Invalid data received from API' });
    }

    // Update cache and time
    cachedData = data;
    lastFetched = currentTime;
    // Return the fetched and validated data
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    console.error("Your API call limit might have been reached — it's a free API.");
    res.status(500).json({ error: 'Error fetching data' });
  }
}


