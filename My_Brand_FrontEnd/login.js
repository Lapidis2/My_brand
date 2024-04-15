document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");
    const errorElement = document.getElementById('err1')

    // @ts-ignore
    const users = JSON.parse(localStorage.getItem("Users")) || [];
    // @ts-ignore
    // @ts-ignore
    const adminCredentials = JSON.parse(localStorage.getItem("AdminCredentials")) || { email: "hitapeter2@gmail.com", password: "Hitayezu@1" };

    // @ts-ignore
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault(); 
        
        // Reset error message
        // @ts-ignore
        errorElement.style.display = "block";

        // Get email and password values
        // @ts-ignore
        const email = loginEmail.value.trim();
        // @ts-ignore
        const password = loginPassword.value.trim();
        const userData = {email, password}
        await loginUser(userData)
        
    });
});

//fetchingdata
const loginUser = async (userData) => {
  try {
      const response = await fetch("http://localhost:5000/auth/login", {
          method: 'POST',
          headers: {
              "Content-Type": 'application/json',
          },
          body: JSON.stringify(userData)
      });

      if (!response.ok) {
          const errors = await response.json();
          const errMessage = errors.message;
          throw new Error(errMessage);
          return
      }

      const data = await response.json();
      const token = data.token;
      localStorage.setItem("token", JSON.stringify(token));
      window.location.href = "Admin_panel/admin.html";
  } catch (err) {
      console.error(err.message);
      errorElement.style.display = "block";
      errorElement.style.backgroundColor = 'red';
      errorElement.innerText = err.message;
  }
}
