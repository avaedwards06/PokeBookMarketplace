// folder where the product pictures are kept
const PHOTO_FOLDER = "images/ProductExampleImages/";

// turns "9.99" into "$9.99"
function formatPrice(price) {
  return "$" + Number(price).toFixed(2);
}

// makes the "Add to cart" button for a product
function createAddButton(product) {
  const button = document.createElement("button");
  button.className = "add-to-cart";
  button.textContent = "Add to cart";

  button.addEventListener("click", function () {
    const added = addToCart(product);
    button.textContent = added ? "Added!" : "No more in stock";
    setTimeout(function () {
      button.textContent = "Add to cart";
    }, 1200);
  });

  return button;
}

// makes one product card
function createProductCard(product, showVendor) {
  const card = document.createElement("div");
  card.className = "product-card";

  // big picture on top
  const photo = document.createElement("div");
  photo.className = "product-photo";

  if (product.photo) {
    const img = document.createElement("img");
    img.src = PHOTO_FOLDER + product.photo;
    img.alt = product.name;
    // ff the file is missing or misspelled, show the message instead
    img.onerror = function () {
      photo.textContent = "Picture coming soon";
    };
    photo.appendChild(img);
  } else {
    photo.textContent = "Picture coming soon";
  }

  // colored bar with the details
  const bar = document.createElement("div");
  bar.className = "product-bar";

  const name = document.createElement("h3");
  name.className = "product-name";
  name.textContent = product.name;

  // price on the left, stock on the right
  const row = document.createElement("div");
  row.className = "product-row";

  const price = document.createElement("span");
  price.className = "product-price";
  price.textContent = formatPrice(product.price);

  const stock = document.createElement("span");
  stock.className = "product-stock";
  if (product.stock === 0) {
    stock.textContent = "Sold out";
    card.classList.add("sold-out");
  } else if (product.stock < 5) {
    stock.textContent = "Only " + product.stock + " left!";
    stock.classList.add("low-stock");
  } else {
    stock.textContent = "In stock";
  }

  row.appendChild(price);
  row.appendChild(stock);
  bar.appendChild(name);
  bar.appendChild(row);

  // "sold by" link (market page only)
  if (showVendor) {
    const soldBy = document.createElement("p");
    soldBy.className = "product-vendor";
    soldBy.textContent = "Sold by ";
    const link = document.createElement("a");
    link.href = "vendor.html?id=" + product.vendorId;
    link.textContent = product.vendor;
    soldBy.appendChild(link);
    bar.appendChild(soldBy);
  }

  // sold-out items get no button
  if (product.stock > 0) {
    bar.appendChild(createAddButton(product));
  }

  card.appendChild(photo);
  card.appendChild(bar);
  return card;
}