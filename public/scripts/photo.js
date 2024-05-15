
document.addEventListener('DOMContentLoaded', function() {
  const inputPrimaryImg = document.getElementById('primaryImage');
  const primaryImg = document.querySelector('.primary');
  const secondaryImg = document.querySelector('.secondary');
  const inputSecondaryImg = document.getElementById('secondaryImage');


  function getImgPrimaryPreview(event) {
    const file = event.target.files[0];

    console.log(file);

    let url = window.URL.createObjectURL(file);

    primaryImg.src = url;
  }

  function getImgSecondaryPreview(event) {
    const file = event.target.files[0];

    console.log(file);

    let url = window.URL.createObjectURL(file);

    secondaryImg.src = url;
  }

  inputPrimaryImg.addEventListener('change', getImgPrimaryPreview);
  inputSecondaryImg.addEventListener('change', getImgSecondaryPreview);
})
