
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

    fetch('/home', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ lat, lng })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Nearest market:', data);
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
}


document.querySelector('#find-me').addEventListener("click", getUserLocation)