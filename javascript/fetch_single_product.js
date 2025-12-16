import { ALL_PRODUCTS_API_URL } from "./fakestoreapi.js";

const params = new URLSearchParams(window.location.search);
const productCategory = params.get('category');
const productTitle = params.get('title');

console.log(productCategory);
console.log(productTitle);

const singleProduct = () => {
    fetch(`${ALL_PRODUCTS_API_URL}/products`)
    .then(res=>res.json())            
    .then((products) => {

        const filtered = products.filter(product =>
            product.title === productTitle
        );

        const singleViewNav = document.querySelector("#single-view-nav");
        const productView = document.querySelector("#show_product");

        filtered.forEach((product) => {
            singleViewNav.append(wayfinding(product));
            productView.append(productCard(product));
        });
        
    }).catch(error => console.log(error));
        
};



const wayfinding = (product) => {
    const navTemplate = document.querySelector("#nav-template").content.cloneNode(true);
    navTemplate.querySelector(".back-btn").setAttribute("href", `products.html?category=${productCategory}`)
    navTemplate.querySelector(".category-link-back").setAttribute("href", `products.html?category=${productCategory}`)
    navTemplate.querySelector(".category-title-nav").innerText = product.category;
    navTemplate.querySelector(".product-title-nav").innerText = product.title;
    return navTemplate;
}

const productCard = (product) => {
    const itemTemplate = document.querySelector("#item-template").content.cloneNode(true);
    itemTemplate.querySelector("img").setAttribute("src", `${product.image}`);
    itemTemplate.querySelector("img").setAttribute("alt", `${product.title}`);
    return itemTemplate;
};

singleProduct();


