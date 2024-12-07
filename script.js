// Fetch Live Bitcoin Price
const btcPriceSpan = document.getElementById("btc-price");
const itemDisplay = document.getElementById("item-display");
const shuffleButton = document.getElementById("shuffle-button");

let btcPrice = 0;
let items = [
  { name: "Tesla Model 3", price: 0.03 },
  { name: "MacBook Pro", price: 0.02 },
  { name: "Rolex Submariner", price: 0.05 },
  { name: "Flight to Paris", price: 0.01 },
  { name: "Gaming PC", price: 0.015 }
];

// Fetch BTC price from a public API
async function fetchBitcoinPrice() {
  try {
    const response = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
    const data = await response.json();
    btcPrice = data.bpi.USD.rate_float;
    btcPriceSpan.textContent = `$${btcPrice.toFixed(2)}`;
    displayItem();
  } catch (error) {
    console.error("Error fetching Bitcoin price:", error);
    btcPriceSpan.textContent = "Error fetching price";
  }
}

// Display a random item
function displayItem() {
  if (items.length === 0) {
    itemDisplay.textContent = "No items to display!";
    return;
  }

  const randomItem = items[Math.floor(Math.random() * items.length)];
  const itemPriceUSD = (randomItem.price * btcPrice).toFixed(2);
  itemDisplay.innerHTML = `
    <h2>${randomItem.name}</h2>
    <p>Price: ${randomItem.price} BTC (~$${itemPriceUSD})</p>
  `;
}

// Shuffle to next item
shuffleButton.addEventListener("click", displayItem);

// Initial fetch
fetchBitcoinPrice();