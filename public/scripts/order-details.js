function showOrderDetails(orderId) {
  var modal = document.getElementById('order-' + orderId);
  modal.style.display = "block";
}

function closeOrderDetails(orderId) {
  var modal = document.getElementById('order-' + orderId);
  modal.style.display = "none";
}

window.onclick = function(event) {
  var modals = document.getElementsByClassName('modal');
  for (var i = 0; i < modals.length; i++) {
    if (event.target == modals[i]) {
      modals[i].style.display = "none";
    }
  }
}