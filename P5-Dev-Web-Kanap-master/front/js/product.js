let search_params = new URLSearchParams(window.location.search);
let id = search_params.get('id');

let urlProduct = (`http://localhost:3000/api/products/${id}`);

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

            const choixcouleur = document.querySelector("#colors");
            choixcouleur.innerHTML = structureOptions;

            const button = document.querySelector('#addToCart');
            button.addEventListener("click", function () {

                const colorChoice = document.querySelector('#colors').value;
                const quantity = document.querySelector('#quantity').value;

                // A mettre dans conditions ..... else

                /*function argumentContientColor() {
                    return [].includes.call(arguments, 'colors');
                }
                console.log(argumentContientColor('color'));
                */

                //if (localStorage.getItem("products")) {
                //  productInLocalStorage = JSON.parse(localStorage.getItem("products"));
                //const idAlreadySelected = productInLocalStorage.filter(products => products.idProduct === products.id);
                //const colorAlreadySelected = productInLocalStorage.filter(products => products.colorChoice === products.colorChoice);
                //}

                //for (let product of products) {
                ///  if (product.colorChoice === colorAlreadySelected.products.colorChoice && products.id === idAlreadySelected.products.id) {
                //product.quantityChoice = total;
                //}
                //}




                let optionsProduct = {
                    idProduct, quantity, colorChoice, name, price, affichagePhoto
                }

                let productInLocalStorage = JSON.parse(localStorage.getItem("product"));

                const addProductLocalStorage = () => {
                    //if (idProduct === idProduct && colorChoice === colorChoice) {
                    //  quantity = total;
                    //console.log(total);
                    //}
                    //else {


                    productInLocalStorage.push(optionsProduct);
                    localStorage.setItem("product", JSON.stringify(productInLocalStorage));
                    //}
                };

                if (productInLocalStorage) {
                    addProductLocalStorage();

                } else {
                    productInLocalStorage = [];
                    addProductLocalStorage();
                }

            });
        })
);



