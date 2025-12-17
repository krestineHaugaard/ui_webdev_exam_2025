import { SESSION_STORAGE_USER_EMAIL } from "./info.js";

const userEmail = sessionStorage.getItem(SESSION_STORAGE_USER_EMAIL);

const params = new URLSearchParams(window.location.search);
const productTitle = params.get('title');

const currentUser = {
    products: []
};

function saveUser(user){
    localStorage.setItem(`${userEmail}`, JSON.stringify(user));  
}

function loadUser(){
    const storedUser = localStorage.getItem(`${userEmail}`);

    if(storedUser) {
        return JSON.parse(storedUser);
    } else {
        saveUser(currentUser);
        return currentUser;
        }
}

function addProduct(productTitle, productsSize){
    const user = loadUser();

    const newProduct = {
        product_name: productTitle,
        product_size:  productsSize
    };

    user.products.push(newProduct);
    saveUser(user);

}

document.querySelector("#product-size-form").addEventListener("submit", (e) => {
     e.preventDefault();

    const productSize = e.target.txtProductSize.value;

    if(userEmail === null){
        document.querySelector("#system-message").innerText = "You must be logged in to add items to your basket";
    }else{
        if(productSize === ""){
            document.querySelector("#system-message").innerText = "You must choose a size";
            return false;
        }else{
            addProduct(productTitle, productSize);
            document.querySelector("#system-message").innerText = "Item has been added to your basket";
        }
    }
}) 


