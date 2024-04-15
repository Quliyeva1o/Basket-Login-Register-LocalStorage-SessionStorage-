window.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const isLoggedIn = localStorage.getItem('user');

    if (isLoggedIn) {
        const userData = JSON.parse(isLoggedIn);
        const username = userData.username; 
        navbar.innerHTML = `
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="#">${username}</a></li>
                <li><button id="logout-btn">Logout</button></li>
            </ul>
        `;
    } else {
        navbar.innerHTML = `
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="login.html">Login</a></li>
                <li><a href="register.html">Register</a></li>
            </ul>
        `;
    }

    // Logout function
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('user');
            window.location.replace("login.html");
        });
    }
});
