document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.username === username && storedUser.password === password) {
        localStorage.setItem('loggedInUser', username);
        window.location.replace("index.html");
        isLoggedin=true
    } else {
        alert('Invalid username or password');
    }
});


