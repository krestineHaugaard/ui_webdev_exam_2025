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
        const systemMessage = document.querySelector("#system-message");
        systemMessage.innerText = "You must be logged in to add items to your basket";
        setTimeout(() => {
            systemMessage.remove();
        }, 5000);
    }else{
        if(productSize === ""){
            const systemMessage = document.querySelector("#system-message");
            systemMessage.innerText = "You must choose a size";
            setTimeout(() => {
                systemMessage.remove();
            }, 5000);
            return false;
        }else{
            addProduct(productTitle, productSize);
            const systemMessage = document.querySelector("#system-message")
            systemMessage.innerText = "Item has been added to your basket";
            setTimeout(() => {
                systemMessage.remove();
            }, 5000);
        }
    }
}) 


