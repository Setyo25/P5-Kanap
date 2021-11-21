let search_params = new URLSearchParams(window.location.search);
let id = search_params.get('id');

let urlProduct = (`http://localhost:3000/api/products/${id}`);
productInLocalStorage = [];

fetch(urlProduct).then((response) =>
    response.json()
        .then((data) => {
            let name = data.name;
            let price = data.price;
            let idProduct = data._id;
            let image = data.imageUrl;
            let altTxt = data.altTxt;

            const affichageItemImg = document.querySelector('.item__img');
            const affichagePhoto = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
            affichageItemImg.insertAdjacentHTML('afterbegin', affichagePhoto);

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

            const choixcouleur = document.querySelector("#colors");
            choixcouleur.innerHTML = structureOptions;

            const button = document.querySelector('#addToCart');
            button.addEventListener("click", function () {

                const colorChoice = document.querySelector('#colors').value;
                const quantity = document.querySelector('#quantity').value;

                let optionsProduct = {
                    idProduct, quantity, colorChoice, name, price, image, altTxt
                }

                let productInLocalStorage = JSON.parse(localStorage.getItem("product"));

                const addProductLocalStorage = () => {

                    productInLocalStorage.push(optionsProduct);
                    localStorage.setItem("product", JSON.stringify(productInLocalStorage));

                };

                if (productInLocalStorage) {
                    productInLocalStorage = [];
                    productInLocalStorage = JSON.parse(localStorage.getItem("product"));

                    const resultFind = productInLocalStorage.find(
                        (el) => el.idProduct === optionsProduct.idProduct && el.colorChoice === optionsProduct.colorChoice);

                    if (resultFind) {
                        console.log(resultFind);
                        let newQuantity = parseInt(optionsProduct.quantity) + parseInt(resultFind.quantity);
                        resultFind.quantity = newQuantity;
                        console.log(resultFind.quantity);
                        localStorage.setItem("product", JSON.stringify(productInLocalStorage));
                    }
                    else {

                        addProductLocalStorage();
                    }

                    //addProductLocalStorage();

                } else {
                    productInLocalStorage = [];
                    addProductLocalStorage();
                }

            });
        })
);
