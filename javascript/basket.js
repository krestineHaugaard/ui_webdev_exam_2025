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
            cardTemplate.querySelector(".product-title").innerText = item.title;
            cardTemplate.querySelector(".product-prize").innerText = item.price;
            cardTemplate.querySelector(".delete-item").addEventListener("click", function (){
                const userBasket = localStorage.getItem(`${userEmail}`);
                if (userBasket){
                    const data = JSON.parse(userBasket);
                    const updatedProducts = data.products.filter(product => 
                        product.product_name !== item.title
                    );

                    localStorage.setItem(`${userEmail}`, JSON.stringify({
                        ...data,
                        products: updatedProducts
                        
                    }));

                    const productList = document.querySelector("#basket-icon-items");
                    const p = document.createElement("p");
                    p.innerText = "And item has been removed"
                    productList.append(p);

                    setTimeout(() => {
                        p.remove();
                    }, 3000);

                    this.closest("article").remove();
                }
            });
            return cardTemplate;
        };

        allProducts();

    }
}else{
    const productList = document.querySelector("#basket-icon-items");
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