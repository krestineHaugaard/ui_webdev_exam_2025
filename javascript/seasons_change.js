const date = new Date();

let month = date.getMonth() + 1;

const thisPage = document.querySelector("html");

if(month === 12 || month ===  1 || month === 2){
    thisPage.setAttribute("data-theme", "winter");
} else if( month === 3 || month === 4 || month === 5){
    thisPage.setAttribute("data-theme", "spring");
} else if(month === 6 || month === 7 || month === 8){
    thisPage.setAttribute("data-theme", "summer");
} else{
    thisPage.setAttribute("data-theme", "fall");
};
