const CART_KEY = "pokebookCart";

// reads the cart and gives back an empty list if there's nothing yet
function getCart() {
  try {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    return [];
  }
}

// saves the cart and updates the number on the cart icon
function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (err) {
    console.error("Couldn't save the cart", err);
  }
  updateCartBadge();
}

// finds the line for this item from this vendor (or its undefined)
function findCartLine(cart, itemId, vendorId) {
  return cart.find(function (line) {
    return line.itemId === itemId && line.vendorId === vendorId;
  });
}

// adds one of a product! won't go over the vendor's stock
// returns true if it was added, false if the stock limit was hit
function addToCart(product) {
  const cart = getCart();
  const line = findCartLine(cart, product.itemId, product.vendorId);

  if (line) {
    if (line.quantity >= product.stock) {
      return false;
    }
    line.quantity += 1;
    line.stock = product.stock;
  } else {
    cart.push({
      itemId: product.itemId,
      vendorId: product.vendorId,
      name: product.name,
      vendor: product.vendor,
      price: Number(product.price),
      stock: product.stock,
      quantity: 1
    });
  }

  saveCart(cart);
  return true;
}

// sets a new quantity
function setQuantity(itemId, vendorId, quantity) {
  let cart = getCart();
  const line = findCartLine(cart, itemId, vendorId);
  if (!line) return;

  if (quantity <= 0) {
    cart = cart.filter(function (l) { return l !== line; });
  } else {
    line.quantity = Math.min(quantity, line.stock);
  }
  saveCart(cart);
}

// removes a line completely
function removeFromCart(itemId, vendorId) {
  setQuantity(itemId, vendorId, 0);
}

// total number of items
function getCartCount() {
  return getCart().reduce(function (total, line) {
    return total + line.quantity;
  }, 0);
}

// total price of everything in the cart
function getCartTotal() {
  return getCart().reduce(function (total, line) {
    return total + line.price * line.quantity;
  }, 0);
}

// shows the number of items on the cart icon in the header
function updateCartBadge() {
  const cartButton = document.querySelector(".cart-button");
  if (!cartButton) return;

  let badge = cartButton.querySelector(".cart-count");
  if (!badge) {
    badge = document.createElement("span");
    badge.className = "cart-count";
    cartButton.appendChild(badge);
  }

  const count = getCartCount();
  badge.textContent = count;
  badge.hidden = (count === 0);
}

// shows the number of items
updateCartBadge();