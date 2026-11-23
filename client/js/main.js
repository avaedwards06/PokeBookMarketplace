const markets = [
  {
    id: 1,
    name: "Clothing Market",
    tagline: "See the latest from our best clothing vendors!",
    image: "images/clothing.png",
    layout: "tall",
    color: "#ef6464"
  },
  {
    id: 2,
    name: "Plushie Market",
    tagline: "Cuddle up with our soft and adorable plushies!",
    image: "images/plushie.png",
    layout: "side",
    color: "#86b9ec"
  },
  { id: 4,
    name: "Fan Art Market",
    tagline: "Show your love for Pokemon with our unique fan art!",
    image: "images/fanart.png",
    layout: "side",
    color: "#f5a9b8"
  },
  { id: 3,
    name: "Pokemon Card Market",
    tagline: "Find the rarest Pokemon cards from all generations!",
    image: "images/pokemoncard.png",
    layout: "side",
    color: "#f7c873"
  },
  { id: 5,
    name: "Bag Charm Market",
    tagline: "Add a touch of Pokemon flair to your bag!",
    image: "images/bagcharm.png",
    layout: "side",
    color: "#c9b6e8"
  },
  { id: 6,
    name: "Furniture Market",
    tagline: "Make your space more Pokemon-friendly!",
    image: "images/furniture.png",
    layout: "side",
    color: "#a8d5ba"
  },
  { id: 7,
    name: "Book Market",
    tagline: "Discover the best Pokemon books and manga!",
    image: "images/book.png",
    layout: "side",
    color: "#f4a582"
  },
  { id: 8,
    name: "Food Market",
    tagline: "Treat yourself to some delicious Pokemon-themed snacks!",
    image: "images/food.png",
    layout: "side",
    color: "#f6e27f"
  },
  { id: 9,
    name: "Rug Market",
    tagline: "The coziest Pokemon rugs money can buy!",
    image: "images/rug.png",
    layout: "side",
    color: "#9fd8df"
  },
  { id: 10,
    name: "Figurines Market",
    tagline: "Collect your favorite Pokemon and Characters in figurine form!",
    image: "images/figurines.png",
    layout: "side",
    color: "#d7c4a3"
  }
];

// Making the picture part of a card
function createImage(market) {
  const imageBox = document.createElement("div");
  imageBox.className = "market-image";

  const img = document.createElement("img");
  img.src = market.image;
  img.alt = market.name;

  // Error for missing image for worst-case
  img.onerror = function () {
    imageBox.classList.add("no-image");
    imageBox.textContent = "Picture coming soon";
  };

  imageBox.appendChild(img);
  return imageBox;
}

// Making the colored label part of a card
function createLabel(market) {
  const label = document.createElement("div");
  label.className = "market-label";
  label.style.backgroundColor = market.color;

  const title = document.createElement("h2");
  title.textContent = market.name;
  label.appendChild(title);

  // Only add the small line of text if the market has one
  if (market.tagline) {
    const tagline = document.createElement("p");
    tagline.textContent = market.tagline;
    label.appendChild(tagline);
  }

  return label;
}

//Making each market card and a link to that market's page
function createMarketCard(market) {
  const card = document.createElement("a");

  // Every market uses the same page. The ID tells it which one to show.
  card.href = "market.html?id=" + market.id;

  card.className = "market-card card-" + market.layout;

  if (market.layout === "plain") {
    card.textContent = market.name;
  } else {
    card.appendChild(createImage(market));
    card.appendChild(createLabel(market));
  }

  return card;
}

// Putting every market card into the grid
function showMarkets(list) {
  const grid = document.getElementById("market-grid");
  grid.innerHTML = "";
  list.forEach(function (market) {
    grid.appendChild(createMarketCard(market));
  });
}

function loadMarkets() {
  showMarkets(markets);
}

loadMarkets();
