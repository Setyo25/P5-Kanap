let search_params = new URLSearchParams(window.location.search);
let id = search_params.get('id');
console.log(id);

let urlProduct = (`http://localhost:3000/api/products/${id}`);

console.log(urlProduct);



fetch(urlProduct).then((response) =>
    response.json().then((data) => {
        console.log(data);
        const affichageItemImg = document.querySelector('.item__img');
        const affichagePhoto = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
        affichageItemImg.insertAdjacentHTML("afterbegin", affichagePhoto);

        document.querySelector('#title').innerHTML = data.name;
        document.querySelector('#price').innerHTML = data.price;
        document.querySelector('#description').innerHTML = data.description;

        const color = data.colors;
        //const optioncolor = color;
        let structureOptions = [];

        for (let i = 0; i < color.length; i++) {
            structureOptions += `
            <option>${color[i]}</option>            
            `;
            console.log(structureOptions);
        }
        /*const newElt = document.createElement("option")
        let elt = document.getElementById("colors");
        elt.appendChild(newElt);*/

        const choixcouleur = document.querySelector("#colors");
        choixcouleur.innerHTML = structureOptions;
    })
);



const button = document.querySelector('#addToCart');
button.addEventListener("click", function () {

    const colorChoice = document.querySelector('#colors').value;
    const quantity = document.querySelector('#quantity').value;
    const name = document.querySelector('#title').innerText;
    const price = document.querySelector('#price').innerText;

    let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
    //console.log(productInLocalStorage);
    if (productInLocalStorage) {
        productInLocalStorage.push(colorChoice, quantity, price, name);
        //console.log(productInLocalStorage);
        localStorage.setItem("product", JSON.stringify(productInLocalStorage));
        console.log(productInLocalStorage);

    } else {
        productInLocalStorage = [];
        console.log(productInLocalStorage);
        productInLocalStorage.push(colorChoice, quantity, price, name);
        //console.log(productInLocalStorage);
        localStorage.setItem("product", JSON.stringify(productInLocalStorage));
        console.log(productInLocalStorage);
    }
});
//console.log(button);

