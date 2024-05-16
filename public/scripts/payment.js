document.getElementById('payInPersonButton').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the default anchor behavior
  document.getElementById('payInPersonButtonBackground').style.backgroundColor = 'orange';
  document.getElementById('payOnlineButtonBackground').style.backgroundColor = '';
  document.querySelector('.in-pserson-checkout-form').style.display = 'flex';
  document.querySelector('.online-checkout-form').style.display = 'none';
});

document.getElementById('payOnlineButton').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the default anchor behavior
  document.getElementById('payOnlineButtonBackground').style.backgroundColor = 'orange';
  document.getElementById('payInPersonButtonBackground').style.backgroundColor = '';
  document.querySelector('.in-pserson-checkout-form').style.display = 'none';
  document.querySelector('.online-checkout-form').style.display = 'flex';
});
