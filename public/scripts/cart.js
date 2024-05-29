document.addEventListener('DOMContentLoaded', function() {
  const addButtons = document.querySelectorAll('.ADD');
  const minusButtons = document.querySelectorAll('.MINUS');
  const deleteButtons = document.querySelectorAll('.TRASH');
  
  // Add event listeners to all ADD buttons
  addButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      const cartId = this.getAttribute('data-cart-id');
      updateCartItem(cartId, 'increase');
    });
  });
  
  // Add event listeners to all MINUS buttons
  minusButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      const cartId = this.getAttribute('data-cart-id');
      updateCartItem(cartId, 'decrease');
    });
  });

  // Add event listeners to all TRASH buttons
  deleteButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      const cartId = this.getAttribute('data-cart-id');
      deleteCartItem(cartId);
    });
  });
  
  function updateCartItem(cartId, action) {
    fetch(`/cart/${action}/${cartId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      fetchCartCount();
      console.log('Update Response:', data);
      if (data.success) {
        const cartProductElement = document.querySelector(`[data-cart-id="${cartId}"]`).closest('.cart-product');
        const quantityElement = cartProductElement.querySelector('.text-wrapper-4');
        if (data.newQuantity > 0) {
          quantityElement.textContent = data.newQuantity;
        } else {
          document.querySelector(`[data-cart-id="${cartId}"]`).closest('.cart-product').remove(); 
          // Remove the product from the DOM if quantity is zero
        }
        updateSubtotal(); 
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Success',
        //   text: 'Cart item updated successfully!',
        // });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update cart item.',
        });
      }
    })
    .catch(error => {
      console.error(`Error updating cart item (${action}):`, error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An unexpected error occurred. Please try again later.',
      });
    });
  }

  function deleteCartItem(cartId) {
    fetch(`/cart/delete/${cartId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      fetchCartCount();
      console.log('Delete Response:', data);
      if (data.success) {
        document.querySelector(`[data-cart-id="${cartId}"]`).closest('.cart-product').remove();
        updateSubtotal(); 
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Success',
        //   text: 'Cart item deleted successfully!',
        // });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete cart item.',
        });
      }
    })
    .catch(error => {
      console.error('Error deleting cart item:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An unexpected error occurred. Please try again later.',
      });
    });
  }

  function updateSubtotal() {
    const cartProducts = document.querySelectorAll('.cart-product');
    let subtotal = 0;
    cartProducts.forEach((product) => {
      const price = parseFloat(product.querySelector('.text-wrapper-3').textContent.replace('$', ''));
      const quantity = parseInt(product.querySelector('.text-wrapper-4').textContent);
      subtotal += price * quantity;
    });
    document.querySelector('.text-wrapper-9').textContent = `$${subtotal.toFixed(2)}`;
  }
});
