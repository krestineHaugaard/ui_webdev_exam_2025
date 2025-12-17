import { SESSION_STORAGE_USER_EMAIL } from "./info.js";
import { ALL_PRODUCTS_API_URL } from "./fakestoreapi.js";

const userEmail = sessionStorage.getItem(SESSION_STORAGE_USER_EMAIL);

if(userEmail !== null){

    const userBasket = localStorage.getItem(`${userEmail}`);

    if(userBasket){

        const data = JSON.parse(userBasket);

        const allProducts = () => {
            data.products.forEach(product => {

                fetch(`${ALL_PRODUCTS_API_URL}/products`)
                .then(res=>res.json())            
                .then((apiProducts) => {
                    
                    const filtered = apiProducts.filter(apiProduct =>
                        apiProduct.title === product.product_name
                    );

                    const productList = document.querySelector("#basket-icon-items");

                    filtered.forEach((item) => {
                        productList.append(productCard(item))
                    });
                    
                })
                .catch(error => console.log(error));
            });
        };

        const productCard = (item) => {
            const cardTemplate = document.querySelector("#basket_icon_card").content.cloneNode(true);
            cardTemplate.querySelector("img").setAttribute("src", `${item.image}`);
            cardTemplate.querySelector("img").setAttribute("alt", `${item.title}`);
            return cardTemplate;
        };

        allProducts();

    }else{
        const productList = document.querySelector("#in_user_basket");
        const p = document.createElement("p");
        p.innerText = "You don't have any items in your basket... yet ;)"
        productList.append(p);
    };
}else{
    const productList = document.querySelector("#in_user_basket");
    const p = document.createElement("p");
    p.innerText = "You need to log in to see your basket"
    productList.append(p);
}


const basketIconBtn = document.querySelector("#btn-user-basket");
const basketModel = document.querySelector("#basket-model");
const closeModelBtn = document.querySelector("#close-basket-model");

basketIconBtn.addEventListener("click", () => {
    basketModel.showModal();
    
});

closeModelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    basketModel.close();
});