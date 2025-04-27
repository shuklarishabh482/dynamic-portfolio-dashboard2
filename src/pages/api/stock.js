
import { fetchPortfolioData } from '@/lib/fetchPortfolioData'

let cache = null;
let lastFetch = 0;
const CACHE_DURATION = 10000; // 10 seconds cache

export default async function handler(req, res) {
  if (Date.now() - lastFetch < CACHE_DURATION && cache) {
    return res.status(200).json(cache)
  }


  try {
    const data = await fetchPortfolioData();
    cache = data;
    lastFetch = Date.now();
    res.status(200).json(data);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Failed to fetch portfolio data' });
  }
}
