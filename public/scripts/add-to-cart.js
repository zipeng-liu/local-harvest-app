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
          fetchCartCount();
          if (data.success) {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Product successfully added to cart!',
              customClass: {
                confirmButton: 'swal-confirm-btn'
              }
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: `Error: ${data.message}`,
              customClass: {
                confirmButton: 'swal-confirm-btn'
              }
            });
          }
        })
        .catch(error => {
          console.error("Error submitting form:", error);
          Swal.fire({
            icon: 'error',
            title: 'Unexpected Error',
            text: 'An unexpected error occurred. Please try again later.',
            customClass: {
              confirmButton: 'swal-confirm-btn'
            }
          });
        });
    });
  });

  document.querySelectorAll(".secondary").forEach(image => {
    image.addEventListener('click', function() {
      const primaryImg = document.querySelector('.primary');
      const tempSrc = primaryImg.src;

      primaryImg.src = image.src;
      image.src = tempSrc;
    });
  });
});
