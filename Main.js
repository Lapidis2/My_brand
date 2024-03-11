const toggleBtn=document.getElementById('toggle-btn');
toggleBtn.onclick=()=>{
    
const menu=document.querySelector('.sidebar');
if(menu.style.display==='none'||menu.style.display===''){
    menu.style.display = "block";
}
else{
    menu.style.display='none'
}
}

let signupBtn = document.getElementById('signupBtn');
let signinBtn = document.getElementById('signinBtn');
let title = document.getElementById('title');
let nameField = document.getElementById('nameField');

signinBtn.onclick =function(){
   nameField.style.maxHeight = '0';
   title.innerHTML = 'Sign in';
   signupBtn.classList.add('disable');
   signinBtn.classList.remove("disable");
}
signupBtn.onclick = function(){
   nameField.style.maxHeight = '65px'
   title.innerHTML = 'Sign up';
   signupBtn.classList.remove('disable');
   signinBtn.classList.add("disable");
}
