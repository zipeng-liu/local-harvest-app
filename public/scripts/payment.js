document.getElementById('payInPersonButton').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the default anchor behavior
  const payInPersonButtonBackground = document.getElementById('payInPersonButtonBackground');
  const payInPersonButton = document.getElementById('payInPersonButton');
  const inPersonCheckoutForm = document.querySelector('.in-pserson-checkout-form');

  if (inPersonCheckoutForm.style.display === 'flex') {
    inPersonCheckoutForm.style.display = 'none';
    payInPersonButtonBackground.style.backgroundColor = '';
    payInPersonButton.style.color = 'black';
  } else {
    inPersonCheckoutForm.style.display = 'flex';
    payInPersonButtonBackground.style.backgroundColor = '#e36b00';
    payInPersonButton.style.color = 'white';
  }
});
