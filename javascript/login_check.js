import { SESSION_STORAGE_USER_EMAIL } from "./info.js";

const userEmail = sessionStorage.getItem(SESSION_STORAGE_USER_EMAIL);
if (userEmail !== null) {
    document.querySelector("#log-in-btn").classList.add("hidden");
    document.querySelector("#log-out-btn").classList.remove("hidden");
    document.querySelector("#check-out-btn").classList.remove("hidden");
} else {
    document.querySelector("#log-in-btn").classList.remove("hidden");
    document.querySelector("#log-out-btn").classList.add("hidden");
    document.querySelector("#check-out-btn").classList.add("hidden");
}