document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const fullName = document.getElementById('fullName').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    const user = {
        username: username,
        email: email,
        fullName: fullName,
        password: password
    };

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('password', JSON.stringify(password));
    window.location.replace("login.html");
});
