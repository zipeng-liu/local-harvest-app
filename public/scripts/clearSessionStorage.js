document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('customer-log-out').addEventListener('click', function(e) {
        e.preventDefault();
        fetch('/auth/customer/logout', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => {
            if (response.ok) {
            // Clear sessionStorage after successful logout
            sessionStorage.clear();
            // Redirect to the home page
            window.location.href = '/';
            } else {
            console.error('Logout failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
        });
        
        
        document.getElementById('vendor-log-out').addEventListener('click', function(e) {
            e.preventDefault();
            fetch('/auth/vendor/logout', {
                method: 'GET',
                credentials: 'include'
            })
            .then(response => {
                if (response.ok) {
                // Clear sessionStorage after successful logout
                sessionStorage.clear();
                // Redirect to the home page
                window.location.href = '/';
                } else {
                console.error('Logout failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
            });
           
})
