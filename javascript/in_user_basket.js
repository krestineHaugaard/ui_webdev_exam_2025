import { SESSION_STORAGE_USER_EMAIL } from "./info.js";
import { ALL_PRODUCTS_API_URL } from "./fakestoreapi.js";

const userEmail = sessionStorage.getItem(SESSION_STORAGE_USER_EMAIL);

if(userEmail !== null){

    const userBasket = localStorage.getItem(`${userEmail}`);

    const data = JSON.parse(userBasket);

    const allProducts = () => {
        data.products.forEach(product => {

            fetch(`${ALL_PRODUCTS_API_URL}/products`)
            .then(res=>res.json())            
            .then((apiProducts) => {
                
                const filtered = apiProducts.filter(apiProduct =>
                    apiProduct.title === product.product_name
                );

                const productList = document.querySelector("#in_user_basket");

                filtered.forEach((item) => {
                    console.log(item)
                    productList.append(productCard(item))
                });
                
            })
            .catch(error => console.log(error));

        });
    };

    const productCard = (item) => {
        const cardTemplate = document.querySelector("#product_card").content.cloneNode(true);
        cardTemplate.querySelector("a").setAttribute("href", `single_product.html?category=${item.category}&title=${item.title}`)
        cardTemplate.querySelector("img").setAttribute("src", `${item.image}`);
        cardTemplate.querySelector("img").setAttribute("alt", `${item.title}`);
        cardTemplate.querySelector("h4").innerText = item.title;
        cardTemplate.querySelector(".product-prize").innerText = item.price;
        cardTemplate.querySelector(".product_rating").innerText = item.rating.rate;
        return cardTemplate;
    };

    allProducts();
}else{
    const productList = document.querySelector("#in_user_basket");
    productList.append(document.createElement("p").innerText = "You don't have any items in your basket... yet ;)");
}