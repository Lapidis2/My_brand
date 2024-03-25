const registerForm = document.getElementById("registerForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("cpassword");
const nameField = document.getElementById("name");
const err = document.querySelector(".err");

registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (confirmPassword.value !== password.value) {
        showError("Passwords must match");
        return;
    }

    let newUser = {
        email: email.value,
        password: password.value,
        name: nameField.value,
    };

    // Check if user with the same email already exists
    let existingUser = JSON.parse(localStorage.getItem("Users")) || [];
    let userExists = existingUser.find(user => user.email === newUser.email);

    if (userExists) {
        showError("User with this email already exists");
        return;
    }

    existingUser.push(newUser);
    localStorage.setItem("Users", JSON.stringify(existingUser));

    // Show success message
    showSuccess("User registered successfully!");
});

function showError(message) {
    err.style.display = "block";
    err.style.backgroundColor = "red";
    err.innerText = message;
}

function showSuccess(message) {
    err.style.display = "block";
    err.style.backgroundColor = "green";
    err.innerText = message;
}