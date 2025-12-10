import { USER_BASE_URL } from "./info";

document.querySelector("#formSignup").addEventListener("submit", (e) => {
    e.preventDefault();

    const userEmail = e.target.txtEmail.value.trim();
    const password = e.target.txtPassword.value.trim();
    const repeatPassword = e.target.txtRepeatPassword.value.trim();

    console.log(userEmail);
    console.log(password);
    console.log(repeatPassword);

    if(password !== repeatPassword){
        // make some ui for incorrekt password
        return false;
    }

    const newUser = {
        email: email,
        password: password
    }

    fetch(`${USER_BASE_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    })
    .catch(error => console.log(error));
});