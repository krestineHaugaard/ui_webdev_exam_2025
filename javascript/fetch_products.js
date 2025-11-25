
import { ALL_PRODUCTS_API_URL } from "./fakestoreapi.js";

const allProducts = () => {
    fetch(`${ALL_PRODUCTS_API_URL}/products`)
    .then(res=>res.json())            
    .then((products) => {
        const productsList = document.querySelector("#products_list");
        products.forEach((product) => {
            productsList.append(productCard(product));
        });
    }).catch(error => console.log(error));
        
};

const productCard = (product) => {
    const h3 = document.createElement("h3");
    h3.innerText = product.title;
    return h3;
}

allProducts();


<section id="products_list">

</section>