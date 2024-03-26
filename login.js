document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");
    const err = document.querySelector(".err");

    // Retrieve registered users and admin credentials from localStorage
    const users = JSON.parse(localStorage.getItem("Users")) || [];
    const adminCredentials = JSON.parse(localStorage.getItem("AdminCredentials")) || { email: "hitapeter2@gmail.com", password: "Hitayezu@1" };

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent form submission
        
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

        // Check if the entered email exists in the registered users' list
        const user = users.find(user => user.email === email);

        if (!user) {
            // Check if the entered email matches the admin credentials
            if (email === adminCredentials.email && password === adminCredentials.password) {
                // Admin login successful, redirect to admin panel
                window.location.href = "Admin_panel/admin.html";
            } else {
                // Display error message for non-existing email
                err.textContent = "Email not found. Please register first or use admin credentials.";
                err.style.display = "block";
            }
            return; // Stop further execution
        }

        // Check if the entered password matches the registered password
        if (password !== user.password) {
            // Display error message for incorrect password
            err.textContent = "Incorrect password. Please try again.";
            err.style.display = "block";
            return; // Stop further execution
        }

        // If email and password are valid for a user, redirect to user dashboard
        window.location.href = "user_dashboard.html"; // Replace with the URL of the user dashboard page
    });
});