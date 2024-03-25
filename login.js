const loginPassword = document.getElementById("loginPassword");
const loginEmail = document.getElementById("loginEmail");
const loginForm = document.getElementById("loginForm");
const err = document.querySelector(".err");
const subBtn = document.getElementById('subBtn');
let users = JSON.parse(localStorage.getItem("Users")) || [];

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    let email = loginEmail.value.trim();
    let password = loginPassword.value.trim();
    subBtn.classList.toggle('disabled');
    subBtn.innerText = "Loading...";
    subBtn.disabled = true;

    try {
        // Check if email and password match the admin credentials
        if (email === "hitapeter2@gmail.com" && password === "Hitayezu@1") {
            // Redirect to admin panel
            err.style.display = "block";
            err.style.backgroundColor = "green";
            err.style.padding = '0.4rem';
            err.innerText = "Successful sign-in, You will be redirected to Dashboard!";
            window.location.href = "https://lapidis2.github.io/My_brand/admin_panel/admin.html";
        } else {
            // Handle invalid credentials
            err.style.display = "block";
            err.innerText = "Invalid username or password.";
        }
    } catch (error) {
        console.log(error);
        err.style.display = "block";
        err.innerText = "Error signing in. Please try again later.";
    }

    setTimeout(() => {
        subBtn.classList.toggle('disabled');
        subBtn.innerText = 'Sign in';
        subBtn.disabled = false;
    }, 2000);
});