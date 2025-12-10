import { USER_BASE_URL } from "./info.js";
import { SESSION_STORAGE_USER_EMAIL } from "./info.js";

document.querySelector("#formLogin").addEventListener("submit", (e) => {
    e.preventDefault();

    fetch(`${USER_BASE_URL}/users`)
    .then(response => response.json())
    .then(data => {
        const userEmail = e.target.txtEmail.value.trim();
        const userPassword = e.target.txtPassword.value.trim();

        let found = false;
        data.forEach(user => {
            console.log(user)
            if (!found) {
                if (user.email === userEmail && user.password === userPassword) {
                    sessionStorage.setItem(SESSION_STORAGE_USER_EMAIL, userEmail);
                    location.href = "index.html";

                    found = true;
                }
            }
        });

        if (!found) {
            // make some validation for invalid information
        }
    })
    .catch(error => console.log(error));
});