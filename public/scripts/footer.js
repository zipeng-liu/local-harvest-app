const cartCounter = document.getElementById("cart-counter");

function fetchCartCount() {
  console.log('Fetching cart count...');
  fetch("/cart/api/getCount", {
    headers: {
      'Cache-Control': 'no-cache' 
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Cart count fetched:', data.count);
    updateCartDisplay(data.count);
  })
  .catch(error => {
    console.error("There has been a problem with your fetch operation:", error);
  });
}
function updateCartDisplay(count) {
  console.log('Updating display with count:', count);
  cartCounter.textContent = count;
  cartCounter.style.display = count > 0 ? "inline" : "none";
}


document.addEventListener("DOMContentLoaded", function() {
  fetchCartCount(); 
});
