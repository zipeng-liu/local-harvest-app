document.getElementById('payInPersonButton').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the default anchor behavior
  document.getElementById('payInPersonButtonBackground').style.backgroundColor = '#e36b00';
  document.getElementById('payOnlineButtonBackground').style.backgroundColor = '';
  document.getElementById('payInPersonButton').style.color = 'white';
  document.getElementById('payOnlineButton').style.color = 'black';
  document.querySelector('.in-pserson-checkout-form').style.display = 'flex';
  document.querySelector('.online-checkout-form').style.display = 'none';
});

document.getElementById('payOnlineButton').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the default anchor behavior
  document.getElementById('payOnlineButtonBackground').style.backgroundColor = '#e36b00';
  document.getElementById('payInPersonButtonBackground').style.backgroundColor = '';
  document.getElementById('payOnlineButton').style.color = 'white';
  document.getElementById('payInPersonButton').style.color = 'black';
  document.querySelector('.in-pserson-checkout-form').style.display = 'none';
  document.querySelector('.online-checkout-form').style.display = 'flex';
});
