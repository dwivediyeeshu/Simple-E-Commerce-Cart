document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Laptop", price: 2999.99 },
    { id: 2, name: "Smartphone", price: 199.99 },
    { id: 3, name: "IPad", price: 599.99 },
  ];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkoutButton = document.getElementById("checkout-btn");

  let cart = JSON.parse(localStorage.getItem("cartItem")) || [];
  renderCart();

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add(
      "product",
      "border",
      "rounded-xl",
      "p-4",
      "bg-white",
      "shadow-sm",
      "hover:shadow-md",
      "transition"
    );

    productDiv.innerHTML = `
     <span class="block text-lg font-medium mb-2">${product.name}</span>
     <span class="block text-gray-600 mb-3">$${product.price.toFixed(2)}</span>
     <button data-id="${product.id}" 
       class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg w-full transition">
       Add to cart
     </button>
  `;

    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const prodId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === prodId);
      console.log(product);

      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    saveCart();
    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");
      cart.forEach((item, index) => {
        totalPrice += item.price;
        let cartItem = document.createElement("div");
        cartItem.innerHTML = `
  <div class="flex justify-between items-center border rounded-lg p-3 bg-gray-50 shadow-sm">
    <span class="text-gray-700 font-medium">${
      item.name
    } - $${item.price.toFixed(2)}</span>
    <button data-id="${item.id}" 
      class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition">
      Remove
    </button>
  </div>
`;

        cartItem.addEventListener("click", (e) => {
          if (e.target.tagName === "BUTTON") {
            cart = cart.filter((p) => p.id !== item.id);
            cartItem.remove();
            saveCart();
            renderCart();
          }
        });

        cartItems.appendChild(cartItem);
      });

      totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
    } else {
      emptyCartMessage.classList.remove("hidden");
      totalPriceDisplay.textContent = `0`;
    }
  }

  checkoutButton.addEventListener("click", () => {
    cart.length = 0;
    saveCart();
    alert("Checkout Successfully");
    renderCart();
  });

  function saveCart() {
    localStorage.setItem("cartItem", JSON.stringify(cart));
  }
});
