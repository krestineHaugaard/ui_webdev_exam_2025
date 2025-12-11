import { USER_BASE_URL } from "./info.js";
import { SESSION_STORAGE_USER_EMAIL } from "./info.js";

document.querySelector("#formLogin").addEventListener("submit", (e) => {
    e.preventDefault();

    fetch(`${USER_BASE_URL}/users`)
    .then(response => response.json())
    .then(data => {
        const userEmail = e.target.txtEmail.value.trim();
        const userPassword = e.target.txtPassword.value.trim();
        const systemMessage = document.querySelector("#system-message")

        data.forEach(user => {
            
            if (user.email === userEmail && user.password === userPassword) {
                sessionStorage.setItem(SESSION_STORAGE_USER_EMAIL, userEmail);
                systemMessage.innerText = "Loggin in...";
                location.href = "index.html";

            } else if (user.email === userEmail && user.password !== userPassword){
                systemMessage.innerText = "Incorrect password";
                    
            } else {
                systemMessage.innerText = "User does not exist";

            } 
        });
    })
    .catch(error => console.log(error));
});