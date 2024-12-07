// Fetch Live Bitcoin Price
const btcPriceSpan = document.getElementById("btc-price");
const itemDisplay = document.getElementById("item-display");
const shuffleButton = document.getElementById("shuffle-button");

let btcPrice = 0;
let items = []; // To hold fetched items dynamically

// Fetch BTC price from a public API
async function fetchBitcoinPrice() {
  try {
    const response = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
    const data = await response.json();
    btcPrice = data.bpi.USD.rate_float;
    btcPriceSpan.textContent = `$${btcPrice.toFixed(2)}`;
    await fetchLuxuryItems(); // Fetch items based on the live price
    displayItem();
  } catch (error) {
    console.error("Error fetching Bitcoin price:", error);
    btcPriceSpan.textContent = "Error fetching price";
  }
}

// Fetch a list of luxury items (static JSON or an external API)
async function fetchLuxuryItems() {
  try {
    // Replace with a real API or use a static JSON file
    const response = await fetch("/luxury-items.json"); // Example static JSON
    const data = await response.json();

    // Update items array and filter by affordability
    items = data.filter((item) => item.price <= 1); // Keep items <= 1 BTC
  } catch (error) {
    console.error("Error fetching luxury items:", error);

    // Fallback data
    items = [
      { name: "Tesla Model 3", price: 0.03, image: "https://via.placeholder.com/300x200?text=Tesla+Model+3" },
      { name: "MacBook Pro", price: 0.02, image: "https://via.placeholder.com/300x200?text=MacBook+Pro" },
      { name: "Rolex Submariner", price: 0.05, image: "https://via.placeholder.com/300x200?text=Rolex+Submariner" },
      { name: "Flight to Paris", price: 0.01, image: "https://via.placeholder.com/300x200?text=Flight+to+Paris" },
      { name: "Gaming PC", price: 0.015, image: "https://via.placeholder.com/300x200?text=Gaming+PC" }
    ];
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
    <div>
      <h2>${randomItem.name}</h2>
      <img src="${randomItem.image}" alt="${randomItem.name}" />
      <p>Price: ${randomItem.price} BTC (~$${itemPriceUSD})</p>
    </div>
  `;
}

// Shuffle to next item
shuffleButton.addEventListener("click", displayItem);

// Initial fetch
fetchBitcoinPrice();