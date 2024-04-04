document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");
    const err = document.querySelector(".err");

    // Retrieve registered users and admin credentials from localStorage
    // @ts-ignore
    const users = JSON.parse(localStorage.getItem("Users")) || [];
    // @ts-ignore
    const adminCredentials = JSON.parse(localStorage.getItem("AdminCredentials")) || { email: "hitapeter2@gmail.com", password: "Hitayezu@1" };

    // @ts-ignore
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent form submission
        
        // Reset error message
        // @ts-ignore
        err.style.display = "none";

        // Get email and password values
        // @ts-ignore
        const email = loginEmail.value.trim();
        // @ts-ignore
        const password = loginPassword.value.trim();

        // Validate email and password
        if (email === "" || password === "") {
            // @ts-ignore
            err.textContent = "Email and password are required.";
            // @ts-ignore
            err.style.display = "block";
            return; // Stop further execution
        }

        // Check if the entered email exists in the registered users' list
        const user = users.find(user => user.email === email);

        if (!user) {
            // Check if the entered email matches the admin credentials
            if (email === 'hitapeter2@gmail.com' && password ==='Hitayezu@1') {
                // Admin login successful, redirect to admin panel
                window.location.href = "Admin_panel/admin.html";
            } else {
                // Display error message for non-existing email
                // @ts-ignore
                err.textContent = "Email or Password not found. Please register first or use admin credentials.";
                // @ts-ignore
                err.style.display = "block";
                // @ts-ignore
                err.style.color='red'
            }
            return; // Stop further execution
        }

        // Check if the entered password matches the registered password
        if (password !== user.password) {
            // Display error message for incorrect password
            // @ts-ignore
            err.textContent = "Incorrect password. Please try again.";
            // @ts-ignore
            err.style.display = "block";
            // @ts-ignore
            err.style.color='red'
            return; // Stop further execution
        }

        // If email and password are valid for a user, redirect to user dashboard
        window.location.href = "Admin_panel/admin.html"; 
    });
});