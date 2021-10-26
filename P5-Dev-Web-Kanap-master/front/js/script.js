/*class Sofa {
    constructor(jSonSofa) {
        jSonSofa && Object.assign(this, jSonSofa);
    }
}*/

const url = "http://localhost:3000/api/products";

fetch(url)
    .then(data => data.json())
    .then(jsonListSofa => {
        for (let sofa of jsonListSofa) {
            //let sofa = new Sofa(jsonSofa);
            console.log(sofa);
            document.querySelector(".items").innerHTML += `
            <a href="./product.html?id=${sofa._id}">
              <article>
              <img src="${sofa.imageUrl}" alt="${sofa.altTxt}">
              <h3 class="productName">${sofa.name}</h3>
              <p class="productDescription">${sofa.description}</p>
            </article>
          </a>`;

        }
    });



/*

const url = "http://localhost:3000/api/products";
const items = document.getElementById('items');

fetch(url)
    .then(response => response.json())
    .then(data => {

        for (product of data) {
            const baliseA = document.createElement('a'); // création balise a href
            items.appendChild(baliseA); // ajout balise a dans section
            baliseA.href = "./product.html?id=" + product._id; //ajout lien href


            const baliseArticle = document.createElement('article'); // créé balise article
            baliseA.appendChild(baliseArticle); // ajout balise article comme enfant de balise a

            const baliseImg = document.createElement('img'); // crée balise img
            baliseImg.src = product.imageUrl; // récupère urlimage de chaque élément
            baliseImg.alt = product.altTxt; // récupère le alt
            baliseArticle.appendChild(baliseImg); // dans balise article ajout de la balise img

            const baliseh3 = document.createElement('h3'); // créé balise h3
            baliseh3.classList.add('productName'); // ajoute la classe .productName à la balise
            baliseArticle.appendChild(baliseh3); // ajoute la balise h3 sur le DOM dans la balise article
            baliseh3.innerHTML = product.name; // récupère pour chaque élément le name et l'insère dans h3

            const baliseP = document.createElement('p');
            baliseP.classList.add('productDescription');
            baliseArticle.appendChild(baliseP);
            baliseP.innerHTML = product.description


        };

    })
    .catch(e => console.log("Une erreur s'est produite : " + e));
*/