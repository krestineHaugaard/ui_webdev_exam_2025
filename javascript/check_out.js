import { SESSION_STORAGE_USER_EMAIL } from "./info.js";
import { ALL_PRODUCTS_API_URL } from "./fakestoreapi.js";

let totalCost = 0

const userEmail = sessionStorage.getItem(SESSION_STORAGE_USER_EMAIL);

const userBasket = localStorage.getItem(`${userEmail}`);

if(userBasket){

    const data = JSON.parse(userBasket);

    const allProducts = () => {
        const fetchPromises = data.products.map(product => {

            return fetch(`${ALL_PRODUCTS_API_URL}/products`)
                .then(res=>res.json())            
                .then((apiProducts) => {
                    
                    const filtered = apiProducts.filter(apiProduct =>
                        apiProduct.title === product.product_name
                    );

                    const itemsForPurchase = document.querySelector("#items-for-purchase");
                    
                    filtered.forEach((item) => {
                        itemsForPurchase.append(productCard(item))
                        totalCost += item.price;
                    }); 
                })
                .catch(error => console.log(error));
        });

        Promise.all(fetchPromises)
            .then(() => {
                const itemsTotalCost = document.querySelector("#items-totalt-cost");
                itemsTotalCost.append(itemCost());
            })
            .catch(error => console.error('Error fetching products:', error));
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

                const itemsForPurchase = document.querySelector("#items-for-purchase");
                const p = document.createElement("p");
                p.innerText = "And item has been removed"
                itemsForPurchase.append(p);

                setTimeout(() => {
                    p.remove();
                }, 3000);

                this.closest("article").remove();

            }
        });
        return cardTemplate;

    };

    const itemCost = () => {
        const p = document.createElement("p");
        p.innerText = totalCost;
        return p;
    }

    allProducts();     
};

const shippingAddressSection = document.querySelector("#shipping-address-section");
const paymentMethodSection = document.querySelector("#payment-method-section");
const purchaseConfirmedSection = document.querySelector("#purchase-confirmed-section");

const shippingForm = document.querySelector("#shipping-address-form");
const paymentForm = document.querySelector("#payment-method-form");

const backToShippingBtn = document.querySelector("#back-to-shipping-btn");

const shippingNavBtn = document.querySelector("#shipping-nav-btn");
const paymentNavBtn = document.querySelector("#payment-nav-btn");
const confirmNavBtn = document.querySelector("#confirm-nav-btn");

shippingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    shippingAddressSection.classList.add("hidden");
    paymentMethodSection.classList.remove("hidden");
    shippingNavBtn.classList.remove("selected");
    shippingNavBtn.classList.add("done");
    paymentNavBtn.classList.add("selected");

});

backToShippingBtn.addEventListener("click", () => {

    
    paymentMethodSection.classList.add("hidden");
    shippingAddressSection.classList.remove("hidden");
    shippingNavBtn.classList.remove("done");
    paymentNavBtn.classList.remove("selected");
    shippingNavBtn.classList.add("selected");
});

paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    paymentMethodSection.classList.add("hidden");
    purchaseConfirmedSection.classList.remove("hidden");

    paymentNavBtn.classList.remove("selected");
    paymentNavBtn.classList.add("done");
    confirmNavBtn.classList.add("selected");

    document.querySelector("#purchase-overview").classList.add("hidden");

    localStorage.removeItem(`${userEmail}`);

});

const orderID = document.querySelector("#order-id");

const calcOrder = Math.random().toString(36).substr(2, 9);

orderID.innerText = `# ${calcOrder}`;