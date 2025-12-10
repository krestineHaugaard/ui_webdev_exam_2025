import { USER_BASE_URL } from "./info.js";

document.querySelector("#formSignup").addEventListener("submit", (e) => {
    e.preventDefault();

    const userEmail = e.target.txtEmail.value.trim();
    const userPassword = e.target.txtPassword.value.trim();
    const userRepeatPassword = e.target.txtRepeatPassword.value.trim();

    if(userPassword !== userRepeatPassword){
        // make some ui for incorrekt password
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
        // make some ui for validating sign up
        e.target.removeEventListener();
    })
    .catch(error => console.log(error));
});