
document.addEventListener('DOMContentLoaded', function() {
  const inputPrimaryImg = document.getElementById('primaryImage');
  const primaryPreview = document.querySelector('.primary-preview');

  
  const inputSecondaryImgs = document.querySelectorAll('.secondary-input');
  const secondaryPreviews = document.querySelectorAll('.secondary-preview')


  function getImgPreview(input, preview) {
    input.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if(file) {
        let url = window.URL.createObjectURL(file);

        preview.src = url;
      }
    })
  }

  getImgPreview(inputPrimaryImg, primaryPreview);


  inputSecondaryImgs.forEach((input, index) => {
    getImgPreview(input, secondaryPreviews[index]);
  })
})
