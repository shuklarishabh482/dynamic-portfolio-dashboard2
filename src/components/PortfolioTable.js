


import React from 'react';
export default function PortfolioTable({ data }) {
  // Calculate totalPresentValue 
  const totalPresentValue = data.reduce((sum, stock) => {
    const value = Number(stock.presentValue);
    return sum + (isNaN(value) ? 0 : value);
  }, 0);

  return (
    <table className="portfolio-table">
      <thead>
        <tr>
          <th>Stock</th>
          <th>Purchase Price</th>
          <th>Quantity</th>
          <th>Investment</th>
          <th>Portfolio Percent</th>
          <th>Current Price</th>
          <th>Present Value</th>
          <th>Gain/Loss</th>
          <th>P/E Ratio</th>
          <th>Latest Earnings</th>
        </tr>
      </thead>
      <tbody>
        {data.map((stock, index) => {
          const presentValue = Number(stock.presentValue);
          const portfolioPercent =
            totalPresentValue > 0 && !isNaN(presentValue)
              ? ((presentValue / totalPresentValue) * 100).toFixed(2)
              : 0;

          return (
            <tr key={index}>
              <td>{stock.name}</td>
              <td>{stock.purchasePrice}</td>
              <td>{stock.quantity}</td>
              <td>{stock.investment}</td>
              <td>{portfolioPercent}%</td> {/* % */}
              <td>{stock.cmp}</td>
              <td>{stock.presentValue}</td>
              <td className={stock.gainLoss >= 0 ? 'gain' : 'loss'}>
                {stock.gainLoss >= 0 ? `+${stock.gainLoss}` : stock.gainLoss}
              </td>
              <td>{stock.peRatio}</td>
              <td>{stock.latestEarnings}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
