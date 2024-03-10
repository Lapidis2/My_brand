// add hovered class to selected list item
let list = document.querySelectorAll(".panel li")
function activeLink(){
    list.forEach((item)=>{
        item.classList.remove("hovered");
    });
    this.classList.add("hovered");
}
list.forEach(item=>item.addEventListener("mouseover",activeLink))
// -------------------------------------------
const signupBtn = document.getElementById("signupBtn");
const signinBtn = document.getElementById("signinBtn");
const title = document.getElementById("title");
const nameField = document.getElementById("nameField");
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
// ------------------------------
const contactUs = document.getElementById("h");
const contactInform = document.getElementById("inform");
const close = document.getElementById("close");
contactUs.onclick = () => {
  contactInform.style.display = "block";
};
close.onclick = () => {
  contactInform.style.display = "none";
};
// ---------------------------------------
const toggleButton = document.getElementById("toggle-button");
const navBar = document.getElementById("nav");

toggleButton.onclick = () => {
  navBar.classList.toggle("activeMenu");
  // document.getElementById('home').style.marginTop="10px"
};
