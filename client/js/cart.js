// turns 9.99 into "$9.99"
function formatPrice(price) {
  return "$" + Number(price).toFixed(2);
}

// makes a small button with a label and a click action
function makeButton(text, className, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.className = className;
  button.addEventListener("click", onClick);
  return button;
}

// makes the row for one product in the cart
function createCartRow(line) {
  const row = document.createElement("div");
  row.className = "cart-row";

  // name and vendor
  const info = document.createElement("div");
  info.className = "cart-info";

  const name = document.createElement("h3");
  name.className = "product-name";
  name.textContent = line.name;

  const vendor = document.createElement("p");
  vendor.className = "product-vendor";
  vendor.textContent = "Sold by ";
  const vendorLink = document.createElement("a");
  vendorLink.href = "vendor.html?id=" + line.vendorId;
  vendorLink.textContent = line.vendor;
  vendor.appendChild(vendorLink);

  const price = document.createElement("p");
  price.className = "cart-price";
  price.textContent = formatPrice(line.price) + " each";

  info.appendChild(name);
  info.appendChild(vendor);
  info.appendChild(price);

  const quantity = document.createElement("div");
  quantity.className = "cart-quantity";

  const minus = makeButton("-", "qty-button", function () {
    setQuantity(line.itemId, line.vendorId, line.quantity - 1);
    showCart();
  });

  const amount = document.createElement("span");
  amount.textContent = line.quantity;

  const plus = makeButton("+", "qty-button", function () {
    setQuantity(line.itemId, line.vendorId, line.quantity + 1);
    showCart();
  });
  // can't add more than the vendor has
  plus.disabled = (line.quantity >= line.stock);

  quantity.appendChild(minus);
  quantity.appendChild(amount);
  quantity.appendChild(plus);

  // line total and remove button
  const right = document.createElement("div");
  right.className = "cart-right";

  const lineTotal = document.createElement("p");
  lineTotal.className = "product-price";
  lineTotal.textContent = formatPrice(line.price * line.quantity);

  const remove = makeButton("Remove", "remove-button", function () {
    removeFromCart(line.itemId, line.vendorId);
    showCart();
  });

  right.appendChild(lineTotal);
  right.appendChild(remove);

  row.appendChild(info);
  row.appendChild(quantity);
  row.appendChild(right);
  return row;
}

// draws the whole cart
function showCart() {
  const cart = getCart();
  const list = document.getElementById("cart-list");
  list.innerHTML = "";

  cart.forEach(function (line) {
    list.appendChild(createCartRow(line));
  });

  const isEmpty = (cart.length === 0);
  document.getElementById("empty-message").hidden = !isEmpty;
  document.getElementById("cart-summary").hidden = isEmpty;
  document.getElementById("cart-total").textContent = formatPrice(getCartTotal());
}

// checkout comes in the next step (btw it needs login to know who's buying)
document.getElementById("checkout-button").addEventListener("click", function () {
  const message = document.getElementById("checkout-message");
  message.textContent = "Checkout is coming soon!";
  message.hidden = false;
});

showCart();