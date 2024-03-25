function formValidation(event) {
    event.preventDefault(); // Prevent default form submission

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('psswd').value;
    
    let allUsers = JSON.parse(localStorage.getItem('Users')) || [];
    let newUser = { name, email, password };
    allUsers.push(newUser);
    localStorage.setItem('Users', JSON.stringify(allUsers));
    
    alert("User created redirecting to login form");
    login(email,password);
    return true; // Allow form submission
}
const form = document.querySelector('form');
form.addEventListener('submit', formValidation);

function login(email, password) {
   
    
    $.post("login.php", { email: email, password: password }, function(data) {
        if (data === "success") {
            window.location.href = "/admin_panel/admin.html"; // Redirect to dashboard on successful login
        } else {
            alert("Login failed. Please try again.");
        }
    });
    
}

