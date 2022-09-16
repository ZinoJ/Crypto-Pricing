import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [coins, setCoins] = useState([]);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const fetchCoins = async () => {
      const response = await fetch(
        `https://api.coincap.io/v2/assets?limit=${limit}`
      );
      const data = await response.json();
      setCoins(data.data);
    };
    fetchCoins();
  }, [limit]);

  return (
    <div className="app">
      <h2>CRPYTO RANKINGS AND PRICES</h2>
      <div className="coinCount"><p>Showing {coins.length} coins</p></div>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Coin Name</th>
            <th>Price in USD</th>
          </tr>
        </thead>

        {coins.map((coin) => (
          <tbody key={coin.id}>
            <tr>
              <td>{coin.rank}</td>
              <td>
                <strong>{coin.name}</strong>
              </td>
              <td>
                <strong>${parseFloat(coin.priceUsd).toFixed(2)}</strong>
              </td>
            </tr>
          </tbody>
        ))}
      </table>

      <div className="buttons">
        <button onClick={() => setLimit(limit + 10)}>Next</button>
        <button
          onClick={() => {
            setLimit(10);
            window.scrollTo(0, 0);
          }}
        >
          Refresh
        </button>
      </div>
    </div>
  );
}

export default App;
