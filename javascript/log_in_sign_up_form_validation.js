
// I have taken a lot of inpiration from this https://www.w3schools.com/howto/howto_js_password_validation.asp
// But I also cleaned up the code because they use var in their exampel, and I have added some validation of my own
// This is purely made to suppert the UI validation, the backend validation is the sign_up.js and log_in.js

const myInput = document.getElementById("txtPassword");
const letter = document.getElementById("letter");
const capital = document.getElementById("capital");
const number = document.getElementById("number");
const specialChar = document.getElementById("special-char");
const lengthMin = document.getElementById("length-min");
const lengthMax = document.getElementById("length-max");


myInput.onkeyup = function() {
  // Validate lowercase letters
  const lowerCaseLetters = /[a-z]/g;
  if(myInput.value.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
}

  // Validate capital letters
  const upperCaseLetters = /[A-Z]/g;
  if(myInput.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Validate numbers
  const numbers = /[0-9]/g;
  if(myInput.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  // Validate numbers
  const spChar = /[!@#$%^&*(),.?-_]/g;
  if(myInput.value.match(spChar)) {
    specialChar.classList.remove("invalid");
    specialChar.classList.add("valid");
  } else {
    specialChar.classList.remove("valid");
    specialChar.classList.add("invalid");
  }

  // Validate length
  if(myInput.value.length >= 8) {
    lengthMin.classList.remove("invalid");
    lengthMin.classList.add("valid");
  } else {
    lengthMin.classList.remove("valid");
    lengthMin.classList.add("invalid");
  }

  // Validate length
  if(myInput.value.length <= 20) {
    lengthMax.classList.remove("invalid");
    lengthMax.classList.add("valid");
  } else {
    lengthMax.classList.remove("valid");
    lengthMax.classList.add("invalid");
  }
}