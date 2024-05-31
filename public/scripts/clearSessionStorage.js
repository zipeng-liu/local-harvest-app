
document.addEventListener("DOMContentLoaded", function() {
    console.log('DOM fully loaded and parsed');
    const customerLogoutButton = document.getElementById('customer-log-out');
    const vendorLogoutButton = document.getElementById('vendor-log-out');

    if (customerLogoutButton) {
        customerLogoutButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            console.log('Customer logout clicked');
            fetch('/auth/customer/logout', {
                method: 'GET',
                credentials: 'include'
            })
            .then(response => {
                if (response.ok) {
                    console.log('Customer logout successful');
                    // Clear sessionStorage after successful logout
                    sessionStorage.clear();
                    // Redirect to the home page
                    window.location.href = '/';
                } else {
                    console.error('Customer logout failed');
                }
            })
            .catch(error => {
                console.error('Customer logout error:', error);
            });
        });
    }

    if (vendorLogoutButton) {
        vendorLogoutButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            console.log('Vendor logout clicked');
            fetch('/auth/vendor/logout', {
                method: 'GET',
                credentials: 'include'
            })
            .then(response => {
                if (response.ok) {
                    console.log('Vendor logout successful');
                    // Clear sessionStorage after successful logout
                    sessionStorage.clear();
                    // Redirect to the home page
                    window.location.href = '/';
                } else {
                    console.error('Vendor logout failed');
                }
            })
            .catch(error => {
                console.error('Vendor logout error:', error);
            });
        });
    }
});
