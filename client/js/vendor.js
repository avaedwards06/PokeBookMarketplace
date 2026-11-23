// get the ID from the URL
const params = new URLSearchParams(window.location.search);
const vendorId = params.get("id");

function showStatus(message) {
  const status = document.getElementById("status");
  status.textContent = message;
  status.hidden = (message === "");
}

// put the vendor's data on the page
function showVendor(vendor) {
  document.getElementById("page-title").textContent = vendor.name;
  document.title = vendor.name + " | Pokebook Marketplace";

  // back link goes to this vendor's market
  const backLink = document.getElementById("back-link");
  backLink.href = "market.html?id=" + vendor.marketId;
  backLink.textContent = "\u2190 " + vendor.market; //the u line is an arrow lol

  // products (cards come from product-card.js)
  // false = no "Sold by", since it's this vendor's own page
  const productGrid = document.getElementById("product-grid");
  vendor.products.forEach(function (row) {
    const product = {
      itemId: row.ID,
      vendorId: vendor.id,
      name: row.Name,
      vendor: vendor.name,
      price: row.Price,
      stock: row.Stock,
      photo: row.Photo
    };
    productGrid.appendChild(createProductCard(product, false));
  });
  document.getElementById("product-section").hidden = false;

  if (vendor.products.length === 0) {
    showStatus("This vendor hasn't added any products yet.");
  } else {
    showStatus("");
  }
}

// ask the back end for this vendor
function loadVendor() {
  if (!vendorId) {
    showStatus("No vendor chosen. Go back and pick one!");
    return;
  }

  fetch("/api/vendors/" + vendorId)
    .then(function (response) {
      if (response.status === 404) {
        throw new Error("This vendor doesn't exist.");
      }
      if (!response.ok) {
        throw new Error("Something went wrong loading this vendor.");
      }
      return response.json();
    })
    .then(function (vendor) {
      showVendor(vendor);
    })
    .catch(function (err) {
      showStatus(err.message);
    });
}

loadVendor();