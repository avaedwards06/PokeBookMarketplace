const markets = [
  {
    id: 1,
    name: "Clothing Market",
    tagline: "See the latest from our best clothing vendors!",
    image: "images/clothing.png",
    layout: "tall",
    color: "#efe08b"
  },
  {
    id: 2,
    name: "Plushie Market",
    tagline: "",
    image: "images/plushie.png",
    layout: "side",
    color: "#86b9ec"
  },
  { id: 4,
    name: "Fan Art Market",
    tagline: "",
    image: "images/fanart.png",
    layout: "side",
    color: "#f5a9b8"
  },
  { id: 3,
    name: "Pokemon Card Market",
    tagline: "",
    image: "images/pokemoncard.png",
    layout: "side",
    color: ""
  },
  { id: 5,
    name: "Bag Charm Market",
    tagline: "",
    image: "images/bagcharm.png",
    layout: "side",
    color: ""
  },
  { id: 6,
    name: "Furniture Market",
    tagline: "",
    image: "images/furniture.png",
    layout: "side",
    color: ""
  },
  { id: 7,
    name: "Book Market",
    tagline: "",
    image: "images/book.png",
    layout: "side",
    color: ""
  },
  { id: 8,
    name: "Food Market",
    tagline: "",
    image: "images/food.png",
    layout: "side",
    color: ""
  },
  { id: 9,
    name: "Rug Market",
    tagline: "",
    image: "images/rug.png",
    layout: "side",
    color: ""
  },
  { id: 10,
    name: "Figurines Market",
    tagline: "",
    image: "images/figurines.png",
    layout: "side",
    color: ""
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

  if (market.id === 1) {
    card.href = "marketHTML/clothesMarket.html?id=";
  }
  else if (market.id === 2) {
    card.href = "marketHTML/plushieMarket.html?id=" + market.id;
  }
  else if (market.id === 3) {
    card.href = "marketHTML/pokemonCardMarket.html?id=" + market.id;
  }
  else if (market.id === 4) {
    card.href = "marketHTML/fanArtMarket.html?id=" + market.id;
  }
  else if (market.id === 5) {
    card.href = "marketHTML/bagCharmMarket.html?id=" + market.id;
  }
  else if (market.id === 6) {
    card.href = "marketHTML/furnitureMarket.html?id=" + market.id;
  }
  else if (market.id === 7) {
    card.href = "marketHTML/bookMarket.html?id=" + market.id;
  }
  else if (market.id === 8) {
    card.href = "marketHTML/foodMarket.html?id=" + market.id;
  }
  else if (market.id === 9) {
    card.href = "marketHTML/rugMarket.html?id=" + market.id;
  }
  else if (market.id === 10) {
    card.href = "marketHTML/figurinesMarket.html?id=" + market.id;
  }

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
