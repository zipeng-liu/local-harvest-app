
// set timeout for live search
// to avoid it keeps fetching
let timeout;

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.search-input').addEventListener('input', function(e) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
          performSearch(e.target.value);
      }, 200);
  });
});


document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault(); 
});



function displayResults(results) {
    const markets = results[0];
    const vendors = results[1];
    const products = results[2];

      const resultContainer = document.getElementById('result-container');
      resultContainer.innerHTML = '';

      if(!results && results.length < 0) {
        const noResultMsg = document.createElement('p');
          noResultMsg.textContent = 'No results found';
          resultContainer.appendChild(noResultMsg);
      }
        // create div for market, vendor, product results
          const marketResults = document.createElement('div');
          const vendorResults = document.createElement('div');
          const productResults = document.createElement('div');

        // create heading for market, vendor, product results
          const marketHeading = document.createElement('h3');
          marketHeading.textContent = 'Market';
          marketHeading.style.color = '#8bbd8b'
          marketResults.appendChild(marketHeading);

        // for each result of markets, vendors, products, create a div
        // set attribute, textContent
          markets.forEach(market => {
              const marketDiv = document.createElement('div');
              marketDiv.className = 'market-item';

              const marketImg = document.createElement('img');
              marketImg.src = `${market.photo}`;
              marketImg.className = 'market-photo';

              const marketAttribute = document.createElement('a');
              marketAttribute.setAttribute('href', `/market/show/${market.marketId}`);
              marketAttribute.className = 'market-link';
              marketAttribute.textContent = market.name;

              marketDiv.appendChild(marketImg);
              marketDiv.appendChild(marketAttribute);
              marketResults.appendChild(marketDiv);
          })


          const vendorHeading = document.createElement('h3');
          vendorHeading.textContent = 'Vendor';
          vendorResults.appendChild(vendorHeading);


          vendors.forEach(vendor => {
              const vendorDiv = document.createElement('div');
              vendorDiv.className = 'vendor-item';

              const vendorImg = document.createElement('img');
              vendorImg.src = `${vendor.photo}`;
              vendorImg.className = 'vendor-photo';
              
              const vendorAttribute = document.createElement('a');
              vendorAttribute.setAttribute('href', `/vendor/show/${vendor.vendorId}`);
              vendorAttribute.className = 'vendor-link';
              vendorAttribute.textContent = vendor.name;

              vendorDiv.appendChild(vendorImg);
              vendorDiv.appendChild(vendorAttribute);
              vendorResults.appendChild(vendorDiv);
          })


          const productHeading = document.createElement('h3');
          productHeading.textContent = 'Product';
          productHeading.style.color = '#ff7c08';
          productResults.appendChild(productHeading);

          products.forEach(product => {
              const productDiv = document.createElement('div');
              productDiv.className = 'product-item';

              const productImg = document.createElement('img');
              productImg.src = `${product.primaryPhoto}`;
              productImg.className = 'product-photo';

              const productAttribute = document.createElement('a')
              productAttribute.setAttribute('href', `/products/${product.productId}`);
              productAttribute.className = 'product-link';
              productAttribute.textContent = product.name;
              
              productDiv.appendChild(productImg);
              productDiv.appendChild(productAttribute)
              productResults.appendChild(productDiv);
          })

          resultContainer.appendChild(marketResults);
          resultContainer.appendChild(vendorResults);
          resultContainer.appendChild(productResults);
  }

  function performSearch(query) {
      if(query.length > 0) {
          fetch('/search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: query })
          })
              .then(response => response.json())
              .then(data =>  displayResults(data.results))
             
              .catch(error => console.log("Error fetching data", error));
      } else {
          document.getElementById('result-container').innerHTML = '';
      }
  }


  

