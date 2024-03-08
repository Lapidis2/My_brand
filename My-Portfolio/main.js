let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
let title = document.getElementById("title");
let nameField = document.getElementById("nameField");
signinBtn.onclick = function () {
  nameField.style.maxHeight = "0";
  title.innerHTML = "Sign in";
  signupBtn.classList.add("disable");
  signinBtn.classList.remove("disable");
};
signupBtn.onclick = function () {
  nameField.style.maxHeight = "65px";
  title.innerHTML = "Sign up";
  signupBtn.classList.remove("disable");
  signinBtn.classList.add("disable");
};



const togglebtn = document.getElementById('toggle-btn');
const navbar = document.querySelector('.navbar');

togglebtn.onclick = () => {
    navbar.classList.toggle('active');
    document.getElementById('home').classList.toggle('home');
    document.getElementById('home').style.marginTop = "50px"
}

