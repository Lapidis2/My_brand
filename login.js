document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");
    const err = document.querySelector(".err");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        // Reset error message
        err.style.display = "none";

        // Get email and password values
        const email = loginEmail.value.trim();
        const password = loginPassword.value.trim();

        // Validate email and password
        if (email === "" || password === "") {
            err.textContent = "Email and password are required.";
            err.style.display = "block";
            return; // Stop further execution
        }

    
    });
});