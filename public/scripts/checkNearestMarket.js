const findMe = document.getElementById('find-me');
const acceptBtn = document.getElementById('acceptBtn');
const denyBtn = document.getElementById('denyBtn');
const div = document.querySelector('.div');

// get user's location
function getUserLocation() {
    if(!navigator.geolocation) {
        console.log("Geolocation is not supported by this browser")
    } else {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    let userPosition = JSON.stringify({lat:lat,lng:lng});
    sessionStorage.setItem("position",userPosition);
    passPosition(userPosition);
}

function passPosition(position){
    fetch('/home', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: position
    })
    .then(response => response.json())
    .then(data => {
        updateNearestMarket(data);
    })
    .catch(error => console.error('Error', error));
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable");
            break;
        case error.TIMEOUT:
            console.log("Get location timed out");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error");
            break;
    }
};

function updateNearestMarket(market) {
    if(market) {

        // remove featured Market container
        const featuredMarketHeader = document.querySelector('.featured-market-header');
        featuredMarketHeader.remove();
        const vendorContainer = document.querySelector('.vendor');
        vendorContainer.remove();

        // create nearest Market container
        const nearestMarketHeader = document.createElement('div');
        nearestMarketHeader.className = 'nearest-market-header';
        nearestMarketHeader.textContent = 'Nearest Market';

        const nearestMarket = document.createElement('div');
        nearestMarket.className = 'nearest-market';

        const nearestMarketDescription = document.createElement('p');
        nearestMarketDescription.className = 'nearest-market-description';
        nearestMarketDescription.textContent = 'Over 30 vendors each week with variety of selections.';

        const businessName = document.createElement('div');
        businessName.className = 'business-name';
        const businessNameLink = document.createElement('a');
        businessNameLink.className = 'button-full-effect';
        businessNameLink.href = `market/show/${market.marketId}`;
        businessNameLink.textContent = market.name;
        businessName.appendChild(businessNameLink);

        const marketPhotoLink = document.createElement('a');
        marketPhotoLink.className = 'button-full-effect';
        marketPhotoLink.href = `market/show/${market.marketId}`;
        const marketPhoto = document.createElement('img');
        marketPhoto.className = 'nearest-market-photo';
        marketPhoto.src = market.photo;
        marketPhotoLink.appendChild(marketPhoto);

        nearestMarket.appendChild(nearestMarketDescription);
        nearestMarket.appendChild(businessName);
        nearestMarket.appendChild(marketPhoto);
        div.appendChild(nearestMarket);
        div.appendChild(nearestMarketHeader);
    }
}



function hidePopup () {
    findMe.classList.remove("show");
    findMe.classList.add("hide");
}
document.addEventListener("DOMContentLoaded", () => {
    
    setTimeout(() => {
        let position = sessionStorage.getItem("position");
        if(position !=null){
            passPosition(position);
        }else{
            findMe.classList.add("show");
        }
    }, 1000);
    
    acceptBtn.addEventListener("click", (e) => {
        getUserLocation();
        document.getElementById('loadingScreen').style.display = 'flex'
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
        }, 6000);
       
        hidePopup();

    });

    denyBtn.addEventListener("click", (e) => {
        hidePopup()
    })
})
