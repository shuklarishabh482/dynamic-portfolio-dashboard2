
 Features : 
 1  Live Stock Prices (Auto-refresh every 15 seconds)

 2  Sector-wise Grouping of Holdings

 3  Gain/Loss Indicators with Green (Profit) and Red (Loss) coloring

4  Portfolio Percent Calculation (Dynamic, based on total investment)

  5 Fast & Optimized:

 6 useCallback, useMemo, and React.memo used to minimize re-renders

  7 Error Handling:

 8 Clean error banners if data fetching fails

  9 Responsive across devices

 10 No Tailwind CSS, pure globals.css for full control

 Tech Stack : 
1 Next.js 15 (App Router)

 2 React 18

 3 CSS Modules (Pure CSS)

 4 Google Finance API (through scraping)

 5 Git & GitHub for version control



 Project Structure

src/
 ├── app/
 │    └── page.jsx (Main Dashboard)
 ├── components/
 │    ├── PortfolioTable.js
 │    ├── ErrorBanner.js
 ├── hooks/
 │    └── useFetchPortfolioData.js
 ├── lib/
 │    └── googleFinance.js
 ├── styles/
 │    └── globals.css
 ├── pages/
 │    └── api/
 │         └── fetchPortfolioData.js
 └── layout.js (App layout)



# 1. Clone this repository
git clone https://github.com/your-username/dynamic-portfolio-dashboard.git

# 2. Move into the folder
cd dynamic-portfolio-dashboard

# 3. Install dependencies
npm install

# 4. Run the development server
npm run dev


Important Notes : 

API Key is hardcoded into googleFinance.js.

Portfolio Percent is calculated dynamically in the UI.

Stock Data might be slightly delayed because it's sourced from free APIs.

Real-time updates use setInterval, no WebSocket (to avoid complexity).

Error Handling: If API fails, an error banner will appear on screen.


Jyotishwar Raj Shukla 






