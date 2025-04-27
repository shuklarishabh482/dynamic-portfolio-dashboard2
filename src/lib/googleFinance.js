
let cachedData = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes caching
const SECTOR_MAPPING = {
  AAPL: 'Technology',
  MSFT: 'Technology',
  GOOGL: 'Technology',
  AMZN: 'Consumer Cyclical',
  META: 'Communication Services',
  TSLA: 'Consumer Cyclical',
  NVDA: 'Technology',
  JPM: 'Financial Services',
  V: 'Financial Services',
  JNJ: 'Healthcare',
  WMT: 'Consumer Defensive',
  UNH: 'Healthcare',
  MA: 'Financial Services',
  PG: 'Consumer Defensive',
  HD: 'Consumer Cyclical',
  XOM: 'Energy',
  BAC: 'Financial Services',
  PFE: 'Healthcare',
  KO: 'Consumer Defensive',
  DIS: 'Communication Services',
  // Add more mappings as needed
};

const STOCK_SYMBOLS = Object.keys(SECTOR_MAPPING);

export default async function fetchGoogleFinanceData() {
  const now = Date.now();

  // If cached data is fresh, return it
  if (cachedData && cacheTimestamp && now - cacheTimestamp < CACHE_DURATION) {
    return cachedData;
  }

  const apiKey = 'wT4SVtTrIX47xtxyCKrIatJEU2agfAmo';
  const url = `https://financialmodelingprep.com/api/v3/quote/${STOCK_SYMBOLS.join(',')}?apikey=${apiKey}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data from Google Finance API: ${response.statusText}`);
    }

    const stocks = await response.json();

    const formattedData = stocks.map((stock) => {
      const purchasePrice = stock.previousClose || stock.price * 0.95; // 
      const quantity = 10; // Assume 10 shares
      const investment = purchasePrice * quantity;
      const presentValue = stock.price * quantity;
      const gainLoss = presentValue - investment;
      return {
        name: stock.symbol,
        sector: SECTOR_MAPPING[stock.symbol] || 'Unknown',
        purchasePrice: purchasePrice.toFixed(2),
        quantity,
        investment: investment.toFixed(2),
        portfolioPercent: 0, //  you can calculate later
        cmp: stock.price.toFixed(2),
        presentValue: presentValue.toFixed(2),
        gainLoss: gainLoss.toFixed(2),
        peRatio: stock.pe ? stock.pe.toFixed(2) : 'N/A',
        latestEarnings: stock.earningsAnnouncement || 'N/A',
      };
    });

    // Cache it
    cachedData = formattedData;
    cacheTimestamp = now;

    return formattedData;
  } catch (error) {
    console.error('Error fetching data from Google Finance:', error);
    throw error;
  }
}
