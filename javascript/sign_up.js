import { USER_BASE_URL } from "./info.js";
import { SESSION_STORAGE_USER_EMAIL } from "./info.js";

document.querySelector("#formSignup").addEventListener("submit", (e) => {
    e.preventDefault();

    const userEmail = e.target.txtEmail.value.trim();
    const userPassword = e.target.txtPassword.value.trim();
    const userRepeatPassword = e.target.txtRepeatPassword.value.trim();
    const systemMessage = document.querySelector("#system-message")

    
    fetch(`${USER_BASE_URL}/users`)
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {    
            if (user.email === userEmail ) {
                systemMessage.innerText = "The e-mail is already in use, by another user";
                setTimeout(() => {
                    systemMessage.remove();
                }, 5000);
                return false;
            } 
        })
    })
    .catch(error => console.log(error));
    
    if(userPassword !== userRepeatPassword){
        systemMessage.innerText = "Your password and repeated password does not match";
        setTimeout(() => {
            systemMessage.remove();
        }, 5000);
        return false;
    }

    const newUser = {
        email: userEmail,
        password: userPassword
    }

    fetch(`${USER_BASE_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    })
    .then(response => response.json())
    .then(data => {
        sessionStorage.setItem(SESSION_STORAGE_USER_EMAIL, userEmail);
        systemMessage.innerText = "Signing up...";
        location.href = "index.html";
        e.target.removeEventListener();
    })
    .catch(error => console.log(error));
});