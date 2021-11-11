let search_params = new URLSearchParams(window.location.search);
let id = search_params.get('id');
let urlProduct = (`http://localhost:3000/api/products/${id}`);
let article = "";

const colorChoice = document.querySelector('#colors');
const quantity = document.querySelector('#quantity');

getArticle();

function getArticle() {
    fetch(urlProduct)
        .then((res) => {
            return res.json();
        })
        .then(async function (resultAPI) {
            article = await resultAPI;
            console.log(article);
            if (article) {
                getPost(article);
            }
        })
        .catch((error) => {
            console.log("Erreur requete API")
        })
}

// fonction pour afficher l'image sur la page produit*****

fetch(urlProduct).then((response) =>
    response.json()
        .then((data) => {
            const affichageItemImg = document.querySelector('.item__img');
            const affichagePhoto = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
            affichageItemImg.insertAdjacentHTML('afterbegin', affichagePhoto);

            let name = data.name;
            let price = data.price;
            let idProduct = data.id;


            document.querySelector('#title').innerHTML = name;
            document.querySelector('#price').innerHTML = price;
            document.querySelector('#description').innerHTML = data.description;

            const color = data.colors;
            const optioncolor = color;
            let structureOptions = [];

            for (let i = 0; i < color.length; i++) {
                structureOptions += `
            <option>${color[i]}</option>
            `;
                console.log(structureOptions);
            }

            const selectionCouleur = document.querySelector("#colors");
            selectionCouleur.innerHTML = structureOptions;
        })

,)
function addProductLocalStorage(article) {
    const button = document.querySelector('#addToCart');
    button.addEventListener("click", function () {
        if (quantity.value > 0 && quantity.value <= 100 && quantity.value != 0) {
            let choixCouleur = colorChoice;
            let nameProduct = data.name;
            let prix = data.price;
            let idKanap = data.id;
            let imageKanap = data.imageUrl;
            let altTxt = data.altTxt;
            let description = data.description;
            let colorSelection = choixCouleur;
            let quantite = data.quantity;


            let optionsProduct = {
                choixCouleur,
                nameProduct,
                prix,
                idKanap,
                imageKanap,
                altTxt,
                description,
                colorSelection,
                quantite

            };

            // Initialisation du local Storage****
            let productInLocalStorage = JSON.parse(localStorage.getItem("product"));

            if (productInLocalStorage) {
                const resultFind = productInLocalStorage.find(
                    (el) => el.idKanap === idKanap && el.colorSelection === choixCouleur);
                if (resultFind) {
                    let newQuantity =
                        parseInt(optionsProduct.quantite) + parseInt(resultFind.quantite);
                    resultFind.quantite = newQuantity;
                    localStorage.setItem("product", JSON.stringify(productInLocalStorage));
                    console.log(productInLocalStorage);
                }
            }
            else {
                productInLocalStorage.push(optionsProduct);
                localStorage.setItem("product", JSON.stringify(productInLocalStorage));
                console.log(productInLocalStorage);
            }
        }
        else {
            productInLocalStorage = [];
            productInLocalStorage.push(optionsProduct);
            localStorage.setItem("product", JSON.stringify(productInLocalStorage));
            console.log(productInLocalStorage);
        }

    })
}
;;



/*
fetch(urlProduct).then((response) =>
    response.json()
        .then((data) => {
            const affichageItemImg = document.querySelector('.item__img');
            const affichagePhoto = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
            affichageItemImg.insertAdjacentHTML('afterbegin', affichagePhoto);

            let name = data.name;
            let price = data.price;
            let idProduct = data.id;


            document.querySelector('#title').innerHTML = name;
            document.querySelector('#price').innerHTML = price;
            document.querySelector('#description').innerHTML = data.description;

            const color = data.colors;
            const optioncolor = color;
            let structureOptions = [];

            for (let i = 0; i < color.length; i++) {
                structureOptions += `
            <option>${color[i]}</option>
            `;
                console.log(structureOptions);
            }

            const selectionCouleur = document.querySelector("#colors");
            selectionCouleur.innerHTML = structureOptions;
        })

        // fonction pour ajouter les donnees au local storage****

        .then((data) => {
            const button = document.querySelector('#addToCart');
            button.addEventListener("click", function () {
                function addProductLocalStorage() {
                    const button = document.querySelector('#addToCart');
                    button.addEventListener("click", function () {
                        const colorChoice = document.querySelector('#colors').value;
                        const quantity = document.querySelector('#quantity').value;

                        if (quantity.value > 0 && quantity.value <= 100 && quantity.value != 0) {

                            let choixCouleur = colorChoice;
                            let nameProduct = data.name;
                            let prix = data.price;
                            let idKanap = data.id;
                            let imageKanap = data.imageUrl;
                            let altTxt = data.altTxt;
                            let description = data.description;
                            let colorSelection = choixCouleur;
                            let quantite = data.quantity;


                            let optionsProduct = {
                                choixCouleur,
                                nameProduct,
                                prix,
                                idKanap,
                                imageKanap,
                                altTxt,
                                description,
                                colorSelection,
                                quantite

                            };

                            // Initialisation du local Storage****
                            let productInLocalStorage = JSON.parse(localStorage.getItem("product"));

                            if (productInLocalStorage) {
                                const resultFind = productInLocalStorage.find(
                                    (el) => el.idKanap === idKanap && el.colorSelection === choixCouleur);
                                if (resultFind) {
                                    let newQuantity =
                                        parseInt(optionsProduct.quantite) + parseInt(resultFind.quantite);
                                    resultFind.quantite = newQuantity;
                                    localStorage.setItem("product", JSON.stringify(productInLocalStorage));
                                    console.log(productInLocalStorage);
                                }
                            }
                            else {
                                productInLocalStorage.push(optionsProduct);
                                localStorage.setItem("product", JSON.stringify(productInLocalStorage));
                                console.log(productInLocalStorage);
                            }
                        }
                        else {
                            productInLocalStorage = [];
                            productInLocalStorage.push(optionsProduct);
                            localStorage.setItem("product", JSON.stringify(productInLocalStorage));
                            console.log(productInLocalStorage);
                        }

                    })
                }
            });
        }));

*/