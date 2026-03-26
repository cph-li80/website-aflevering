// DATA (array)
const produkter = [
  { navn: "Chokolade", pris: 20, billede: "chokolade.jpg" },
  { navn: "Vaniljechokolade", pris: 18, billede: "chokolade2.jpg" },
  { navn: "Mørkechokolade", pris: 25, billede: "chokolade3.jpg" },
];

// STATE
let kurv = [];

// DOM
const productsDiv = document.getElementById("products");
const cartItems = document.getElementById("cartItems");
const cart = document.getElementById("cart");
const toggleBtn = document.getElementById("toggleCart");
const status = document.getElementById("status");
const receipt = document.getElementById("receipt");

// TID (åbningstider)
const nu = new Date();
const time = nu.getHours();

let erAaben;

if (time >= 10 && time <= 20) {
  status.textContent = "🟢 Butikken er åben!";
  erAaben = true;
} else {
  status.textContent = "🔴 Butikken er lukket!";
  erAaben = false;
}

// VIS PRODUKTER
produkter.forEach(function (produkt) {
  const produktDiv = document.createElement("div");
  produktDiv.classList.add("produkt");

  const img = document.createElement("img");
  img.src = produkt.billede;
  img.alt = produkt.navn;
  img.style.width = "100px"; // Justér størrelsen efter behov
  img.style.height = "100px";

  const btn = document.createElement("button");
  btn.textContent = produkt.navn + " - " + produkt.pris + " kr";

  btn.addEventListener("click", function () {
    // IF/ELSE
    if (!erAaben) {
      status.textContent = "🔴 Butikken er lukket!";
      return;
    }

    // Når butikken åbner igen, vis åben status
    status.textContent = "🟢 Butikken er åben!";

    // Toggle selection and cart
    if (btn.classList.contains("active")) {
      // Remove from cart
      kurv = kurv.filter((item) => item !== produkt);
      btn.classList.remove("active");
    } else {
      // Add to cart
      kurv.push(produkt);
      btn.classList.add("active");
    }

    opdaterKurv();
  });

  produktDiv.appendChild(img);
  produktDiv.appendChild(btn);
  productsDiv.appendChild(produktDiv);
});

// TOGGLE KURV
toggleBtn.addEventListener("click", function () {
  cart.classList.toggle("hidden");
});

// OPDATER KURV
function opdaterKurv() {
  cartItems.innerHTML = "";

  kurv.forEach(function (item) {
    const li = document.createElement("li");
    li.textContent = item.navn;
    cartItems.appendChild(li);
  });

  // KVITTERING MED TID
  const nu = new Date();
  receipt.textContent = "Bestilt kl: " + nu.getHours() + ":" + nu.getMinutes();
}
