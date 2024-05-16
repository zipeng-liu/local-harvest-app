document.addEventListener("DOMContentLoaded", function() {
    const addToCartForm = document.querySelectorAll(".add-to-cart-form");

    console.log(addToCartForm, "addToCartForm");
    addToCartForm.forEach(form => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);

        const productId = "<%= product.productId %>";
        const actionUrl = event.currentTarget.action;

        fetch(actionUrl, {
          method: "POST",
          body: formData,
        })
          .then(response => response.json())
          .then(data => {
            fetchCartCount()
            if (data.success) {
              alert("Product successfully added to cart!");
            } else {
              alert(`Error: ${data.message}`);
            }
          })
          .catch(error => {
            console.error("Error submitting form:", error);
            alert("An unexpected error occurred. Please try again later.");
          });
       });
     });
    });