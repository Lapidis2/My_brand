const wrapper =document.querySelector('.wrapper');
// const loginLink =document.querySelector('.login-link');
const registerLink =document.querySelector('.register-link');
const navLinks = document.getElementById('nav-links');
const close = document.getElementById('close');
const toggleBtn = document.getElementById('toggle-btn');
const backToHomeBtn = document.getElementById('backToHomeBtn');



backToHomeBtn.addEventListener('click', () => {
    // Redirect to home page 
    window.location.href = 'index.html'; 
});


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

 

