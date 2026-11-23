// get the ID from the URL
const params = new URLSearchParams(window.location.search);
const marketId = params.get("id");

function showStatus(message) {
  const status = document.getElementById("status");
  status.textContent = message;
  status.hidden = (message === "");
}

// makes a button-like link for one vendor
function createVendorLink(vendor) {
  const link = document.createElement("a");
  link.className = "vendor-link";
  link.href = "vendor.html?id=" + vendor.ID;
  link.textContent = vendor.Name;
  return link;
}

// put the market's data on the page
function showMarket(market) {
  // title in the header and the browser tab
  document.getElementById("page-title").textContent = market.name;
  document.title = market.name + " | Pokebook Marketplace";

  // vendors
  const vendorList = document.getElementById("vendor-list");
  market.vendors.forEach(function (vendor) {
    vendorList.appendChild(createVendorLink(vendor));
  });
  document.getElementById("vendor-section").hidden = false;

  // products (cards come from product-card.js)
  // true = show "Sold by", since a market has many vendors
  const productGrid = document.getElementById("product-grid");
  market.products.forEach(function (row) {
    const product = {
      itemId: row.ID,
      vendorId: row.VendorID,
      name: row.Name,
      vendor: row.Vendor,
      price: row.Price,
      stock: row.Stock,
      photo: row.Photo
    };
    productGrid.appendChild(createProductCard(product, true));
  });
  document.getElementById("product-section").hidden = false;

  // nothing for sale yet
  if (market.products.length === 0) {
    showStatus("No products for sale in this market yet.");
  } else {
    showStatus("");
  }
}

// ask the back end for this market
function loadMarket() {
  if (!marketId) {
    showStatus("No market chosen. Go back and pick one!");
    return;
  }

  fetch("/api/markets/" + marketId)
    .then(function (response) {
      if (response.status === 404) {
        throw new Error("This market doesn't exist.");
      }
      if (!response.ok) {
        throw new Error("Something went wrong loading this market.");
      }
      return response.json();
    })
    .then(function (market) {
      showMarket(market);
    })
    .catch(function (err) {
      showStatus(err.message);
    });
}

loadMarket();