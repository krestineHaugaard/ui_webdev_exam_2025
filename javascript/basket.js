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