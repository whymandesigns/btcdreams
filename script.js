// Fetch Live Bitcoin Price
const btcPriceSpan = document.getElementById("btc-price");
const itemGrid = document.getElementById("item-grid");

let btcPrice = 0;

// List of luxury items
const items = [
  { name: "Tesla Model 3", price: 0.03, image: "https://via.placeholder.com/300x200?text=Tesla+Model+3" },
  { name: "Rolex Submariner", price: 0.05, image: "https://via.placeholder.com/300x200?text=Rolex+Submariner" },
  { name: "MacBook Pro", price: 0.02, image: "https://via.placeholder.com/300x200?text=MacBook+Pro" },
  { name: "Louis Vuitton Bag", price: 0.01, image: "https://via.placeholder.com/300x200?text=Louis+Vuitton+Bag" },
  { name: "First-Class Flight", price: 0.04, image: "https://via.placeholder.com/300x200?text=First-Class+Flight" },
];

// Fetch BTC price from a public API
async function fetchBitcoinPrice() {
  try {
    const response = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
    const data = await response.json();
    btcPrice = data.bpi.USD.rate_float;
    btcPriceSpan.textContent = `$${btcPrice.toFixed(2)}`;
    displayItems();
  } catch (error) {
    console.error("Error fetching Bitcoin price:", error);
    btcPriceSpan.textContent = "Error fetching price";
  }
}

// Display items as cards
function displayItems() {
  itemGrid.innerHTML = ""; // Clear existing items
  items.forEach((item) => {
    const itemPriceUSD = (item.price * btcPrice).toFixed(2);
    const itemCard = `
      <div class="item-card">
        <img src="${item.image}" alt="${item.name}">
        <h2>${item.name}</h2>
        <p>${item.price} BTC</p>
        <p>~$${itemPriceUSD}</p>
      </div>
    `;
    itemGrid.innerHTML += itemCard;
  });
}

// Initial fetch
fetchBitcoinPrice();