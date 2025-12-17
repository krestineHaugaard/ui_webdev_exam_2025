const languageChangeBtn = document.querySelector("#btn-user-language");
const languageModel = document.querySelector("#change-language-model");
const closeModelBtn = document.querySelector("#close-language-model");

languageChangeBtn.addEventListener("click", () => {
    languageModel.showModal();
    
});

closeModelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    languageModel.close();
});

// I have abesolutely no idea why this model does not work, but the basket works 
// It is build the same, but does not work the same, ery strange