// get the ID from the URL
const params = new URLSearchParams(window.location.search);
const vendorId = params.get("id");

function showStatus(message) {
  const status = document.getElementById("status");
  status.textContent = message;
  status.hidden = (message === "");
}

// turns number to price
function formatPrice(price) {
  return "$" + Number(price).toFixed(2);
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

  const description = document.createElement("p");
  description.className = "product-description";
  description.textContent = product.Description || "";

  // stock: sold out, only a few left, or normal
  const stock = document.createElement("p");
  stock.className = "product-stock";
  if (product.Stock === 0) {
    stock.textContent = "Sold out";
    stock.classList.add("low-stock");
    card.classList.add("sold-out");
  } else if (product.Stock < 5) {
    stock.textContent = "Only " + product.Stock + " left!";
    stock.classList.add("low-stock");
  } else {
    stock.textContent = product.Stock + " in stock";
  }

  card.appendChild(photo);
  card.appendChild(name);
  card.appendChild(price);
  card.appendChild(description);
  card.appendChild(stock);
  return card;
}

// put the vendor's data on the page
function showVendor(vendor) {
  document.getElementById("page-title").textContent = vendor.name;
  document.title = vendor.name + " | Pokebook Marketplace";

  // back link goes to this vendor's market
  const backLink = document.getElementById("back-link");
  backLink.href = "market.html?id=" + vendor.marketId;
  backLink.textContent = "\u2190 " + vendor.market; //the u line is an arrow lol

  // products
  const productGrid = document.getElementById("product-grid");
  vendor.products.forEach(function (product) {
    productGrid.appendChild(createProductCard(product));
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