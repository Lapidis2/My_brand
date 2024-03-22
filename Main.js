const wrapper =document.querySelector('.wrapper');
// const loginLink =document.querySelector('.login-link');
const registerLink =document.querySelector('.register-link');
const navLinks = document.getElementById('nav-links');
const close = document.getElementById('close');
const toggleBtn = document.getElementById('toggle-btn');
const backToHomeBtn = document.getElementById('backToHomeBtn');

registerLink.addEventListener('click',(event)=>{
    wrapper.classList.add('current');
    event.preventDefault();
});

backToHomeBtn.addEventListener('click', () => {
    // Redirect to home page 
    window.location.href = 'index.html'; 
});

/// toggle menu

// toggleBtn.onclick = () =>{


//       }
// }
document.getElementById('close').addEventListener('click',function(){
    navLinks.style.display = 'none';
})
toggleBtn.onclick = ()=>{
    navLinks.classList.toggle('active');
    if (navLinks.style.display === 'block') {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'block';
}}

// function toggleNavbar() {

    
//     nav.classList.toggle('active');
//     menuIcon.style.display = menuIcon.style.display === 'none' ? 'inline-block' : 'none';
//     closeIcon.style.display = closeIcon.style.display === 'none' ? 'inline-block' : 'none';
//   }


// ================form validation===================

 
    // check validity by if condition
    function formValid() {
        var email_input = document.getElementById("email");
        var password_input= document.getElementById("psswd");
        var email_error = document.getElementById("emailerror");
        var password_error = document.getElementById("psswd_error");
        var email = email_input.value.trim();
        var password = password_input.value.trim();
        var email_pattern= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var password_Pattern  = /^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[!@#$%^&*]).{7,}$/;
    
        // Reset error messages
        email_error.textContent = "";
        password_error.textContent = "";
    
        if (email === "") {
            email_error.textContent = "Please, Email is required!";
            email_input.focus();
            return false;
        } else if (!email_pattern.test(email)) {
            email_error.textContent = "This Email format is Invalid. Please try again!";
            email_input.focus();
            return false;
        }
    
        if (password === "") {
            password_error.textContent = "Please, password is required!";
            password_input.focus();
            return false;
        } else if (!password_Pattern .test(password)) {
            password_error.textContent = "Password must be at least 7 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character";
            password_input.focus();
            return false;
        }
    
        return true;
    }
    // =================registrationform===============
    function formValidation(e) {
        e.preventDefault();
        let name = document.getElementById("userNameField");
        var email_input = document.getElementById("email");
        var password_input= document.getElementById("psswd");
        var email_error1 = document.getElementById("emailerror");
        let psswd_error = document.getElementById("psswd_error");
        var email = email_input.value.trim();
        var password = password_input.value.trim();
        var email_pattern= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var password_Pattern  = /^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[!@#$%^&*]).{7,}$/;
    
        // Reset error messages
        email_error1.textContent = "";
        psswd_error.textContent = "";
    
        if (email === "") {
            email_error1.textContent = "Please, Email is required!";
            email_input.focus();
            return false;
        } else if (!email_pattern.test(email)) {
            email_error1.textContent = "This Email format is Invalid. Please try again!";
            email_input.focus();
            return false;
        }
    
        if (password === "") {
            psswd_error.textContent = "Please, password is required!";
            password_input.focus();
            return false;
        } else if (!password_Pattern .test(password)) {
            psswd_error.textContent = "Password must be at least 7 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character";
            password_input.focus();
            return false;
        }
    
        return true;
    }
    // =============================local storage================================

    function formValidation(){
        let user_name,user_email,password;
user_name=document.getElementById('user_name').value;
user_email=document.getElementById('email1').value;
password=document.getElementById('psswd1').value;
    let user_values=new Array();
    user_values=JSON.parse(localStorage.getItem("user_values"))||[];
    if(user_values.some((v)=>{
        return v.email==email
    }))
    {
        alert("duplicate email")
    }
    else{
        user_values.push({
            "user_name":user_name,
            "email1":user_email,
            "psswd1":password,
        })
        localStorage.setItem("user_values",JSON.stringify(user_values));
    }

    }