
import { ALL_PRODUCTS_API_URL } from "./fakestoreapi.js";

const params = new URLSearchParams(window.location.search);
const category = params.get('category');

if (category === 'men') {
    document.getElementById('products_title').innerHTML = "Men's Clothing";
} else if (category === 'women') {
    document.getElementById('products_title').innerHTML = "Women's Clothing";
} else {
    document.getElementById('products_title').innerHTML = "Please pick a category";
};

const categoryMap = {
    men: "men's clothing",
    women: "women's clothing"
};

const allProducts = () => {
    fetch(`${ALL_PRODUCTS_API_URL}/products`)
    .then(res=>res.json())            
    .then((products) => {

        const filtered = products.filter(product =>
            product.category === categoryMap[category]
        );

        const productsList = document.querySelector("#products_list");

        filtered.forEach((product) => {
            console.log(product)
            productsList.append(productCard(product));
        });
        
    }).catch(error => console.log(error));
        
};

const productCard = (product) => {
    const cardTemplate = document.querySelector("#product_card").content.cloneNode(true);
    cardTemplate.querySelector("a").setAttribute("href", `single_product.html?title=${product.title}`)
    cardTemplate.querySelector("img").setAttribute("src", `${product.image}`);
    cardTemplate.querySelector("img").setAttribute("alt", `${product.title}`);
    cardTemplate.querySelector("h2").innerText = product.title;
    cardTemplate.querySelector(".product-prize").innerText = product.price;
    cardTemplate.querySelector(".product_rating").innerText = product.rating.rate;
    return cardTemplate;
};

allProducts();