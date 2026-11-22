// get the ID from the URL
const params = new URLSearchParams(window.location.search);
const marketId = params.get("id");

function showStatus(message) {
  const status = document.getElementById("status");
  status.textContent = message;
  status.hidden = (message === "");
}

// turns price inputs like "9.99" into "$9.99"
function formatPrice(price) {
  return "$" + Number(price).toFixed(2);
}

// makes a button-like link for one vendor
function createVendorLink(vendor) {
  const link = document.createElement("a");
  link.className = "vendor-link";
  link.href = "vendor.html?id=" + vendor.ID;
  link.textContent = vendor.Name;
  return link;
}

// makes the card for one product
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  // images area
  const photo = document.createElement("div");
  photo.className = "product-photo";
  photo.textContent = "Picture coming soon";

  const name = document.createElement("h3");
  name.className = "product-name";
  name.textContent = product.Name;

  const price = document.createElement("p");
  price.className = "product-price";
  price.textContent = formatPrice(product.Price);


  const soldBy = document.createElement("p");
  soldBy.className = "product-vendor";
  soldBy.textContent = "Sold by ";
  const vendorLink = document.createElement("a");
  vendorLink.href = "vendor.html?id=" + product.VendorID;
  vendorLink.textContent = product.Vendor;
  soldBy.appendChild(vendorLink);

  // stock warn when only a few are left
  const stock = document.createElement("p");
  stock.className = "product-stock";
  if (product.Stock < 5) {
    stock.textContent = "Only " + product.Stock + " left!";
    stock.classList.add("low-stock");
  } else {
    stock.textContent = product.Stock + " in stock";
  }

  card.appendChild(photo);
  card.appendChild(name);
  card.appendChild(price);
  card.appendChild(soldBy);
  card.appendChild(stock);
  return card;
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

  // products
  const productGrid = document.getElementById("product-grid");
  market.products.forEach(function (product) {
    productGrid.appendChild(createProductCard(product));
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