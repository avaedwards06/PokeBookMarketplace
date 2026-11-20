const vendors = [
  {
    id: 1,
    name: "Rob's Rugs!",
    tagline: "",
    image: "",
    layout: "tall",
    color: "#efe08b"
  },
  {
    id: 2,
    name: "Rurururugs!",
    tagline: "",
    image: "",
    layout: "tall",
    color: "#86b9ec"
  }
];

// Making the picture part of a card
function createImage(vendor) {
  const imageBox = document.createElement("div");
  imageBox.className = "vendor-image";

  const img = document.createElement("img");
  img.src = vendor.image;
  img.alt = vendor.name;

  // Error for missing image for worst-case
  img.onerror = function () {
    imageBox.classList.add("no-image");
    imageBox.textContent = "Picture coming soon";
  };

  imageBox.appendChild(img);
  return imageBox;
}

// Making the colored label part of a card
function createLabel(vendor) {
  const label = document.createElement("div");
  label.className = "vendor-label";
  label.style.backgroundColor = vendor.color;

  const title = document.createElement("h2");
  title.textContent = vendor.name;
  label.appendChild(title);

  // Only add the small line of text if the vendor has one
  if (vendor.tagline) {
    const tagline = document.createElement("p");
    tagline.textContent = vendor.tagline;
    label.appendChild(tagline);
  }

  return label;
}

//Making each vendor card and a link to that vendor's page
function createVendorCard(vendor) {
  const card = document.createElement("a");

  if (vendor.id === 1) {
    card.href = "../vendorHTML/robsRugs.html?id=";
  }
  else if (vendor.id === 2) {
    card.href = "../vendorHTML/rurururugs.html?id=" + vendor.id;
  }

  card.className = "market-card card-" + vendor.layout;

  if (vendor.layout === "plain") {
    card.textContent = vendor.name;
  } else {
    card.appendChild(createImage(vendor));
    card.appendChild(createLabel(vendor));
  }

  return card;
}

// Putting every vendor card into the grid
function showVendors(list) {
  const grid = document.getElementById("market-grid");
  grid.innerHTML = "";
  list.forEach(function (vendor) {
    grid.appendChild(createVendorCard(vendor));
  });
}

function loadVendors() {
  showVendors(vendors);
}

loadVendors();
