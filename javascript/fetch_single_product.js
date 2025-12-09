import { ALL_PRODUCTS_API_URL } from "./fakestoreapi.js";

const params = new URLSearchParams(window.location.search);
const productTitle = params.get('title');

console.log(productTitle);

const singleProduct = () => {
    fetch(`${ALL_PRODUCTS_API_URL}/products`)
    .then(res=>res.json())            
    .then((products) => {

        const filtered = products.filter(product =>
            product.title === productTitle
        );

        const productView = document.querySelector("#show_product");

        filtered.forEach((product) => {
            console.log(product)
            productView.append(productCard(product));
        });
        
    }).catch(error => console.log(error));
        
};

const productCard = (product) => {
    const itemTemplate = document.querySelector("#item_template").content.cloneNode(true);
    itemTemplate.querySelector("img").setAttribute("src", `${product.image}`);
    itemTemplate.querySelector("img").setAttribute("alt", `${product.title}`);
    return itemTemplate;
};

singleProduct();