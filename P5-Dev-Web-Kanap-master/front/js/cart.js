let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
console.log(productInLocalStorage);

// ID où on va injecter HTML
const productsInCart = document.querySelector("#cart__items");
//console.log(productsInCart);

if (productInLocalStorage === null) {
  //Si le panier est vide
  const EmptyCart = `
  
        <div>
            <div>
                Le panier est vide
            </div>
        </div>
        `;
  productsInCart.innerHTML = EmptyCart;
}
else {
  //Si le panier est rempli
  let structureProductsCart = document.getElementById("cart__items");

  for (let product of productInLocalStorage) {
    structureProductsCart.innerHTML += `
    <article class="cart__item" data-id="${product._id}">
    <div class="cart__item__img">
      <img src= ${product.image} alt= ${product.altTxt}>
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${product.name}</h2>
        <p>${product.price} €</p>
        <p>${product.colorChoice}</p>

      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
        
        `;
  }
  /*
  if (k == productInLocalStorage.length) {
    productsInCart.innerHTML = structureProductsCart;
  }*/

}

// Le montant total du panier****

// créer la variable pour mettre le prix total du panier

/*
function modifQuantity() {
  const itemModifQuantity = document.querySelectorAll(".itemQuantity");

  for (let itemModifQuantity of productInLocalStorage) {
    itemModifQuantity.addEvenlistener('change', (event) => {
      event.preventDefault();

      let quantityModif = productInLocalStorage[q].quantity;
      let quantityModifValue = quantityModif[q].valueAsNumber;

      const resultFind = productInLocalStorage.find((el) => el.quantityModifValue !== quantityModif);

      resultFind.quantity = quantityModifValue;
      productInLocalStorage[k].quantity = resultFind.quantity;

      localStorage.setItem("product", JSON.stringify(productInLocalStorage));

      location.reload();
    })
  }
}
modifQuantity();

*/


// total quantite dans le panier 

let totalQuantityCalcule = [];

//Chercher la quantite dans le panier

for (let n = 0; n < productInLocalStorage.length; n++) {
  let quantityOfProductsInCartString = productInLocalStorage[n].quantity;
  let quantityOfProductsInCart = parseInt(quantityOfProductsInCartString);
  //total quantite dans le panier
  totalQuantityCalcule.push(quantityOfProductsInCart)
  console.log(totalQuantityCalcule);

  // additionner la quantite dans le panier
  function reducer(accumulator, currentValue) {
    return accumulator + currentValue;
  }
  const totalQuantityProducts = totalQuantityCalcule.reduce(reducer);
  console.log(totalQuantityProducts);

  let totalQuantityEnd = document.getElementById("totalQuantity");
  totalQuantityEnd.innerHTML = totalQuantityProducts;

}











let totalPriceCalcule = [];

//Chercher les prix dans le panier

for (let m = 0; m < productInLocalStorage.length; m++) {
  let priceOfProductsInCart = productInLocalStorage[m].price;

  //total prix dans le panier
  totalPriceCalcule.push(priceOfProductsInCart)
  console.log(totalPriceCalcule);

  // additionner les prix dans le panier
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalPriceProducts = totalPriceCalcule.reduce(reducer, 0);
  console.log(totalPriceProducts);

  let totalPriceEnd = document.getElementById("totalPrice");
  totalPriceEnd.innerHTML = totalPriceProducts;


}

//**************** Formulaire*****************

// AddEventlistener****
// Selectionner le bouton pour envoyer le formulaire****

const btnSendFormOrder = document.getElementById("order");
console.log(btnSendFormOrder);

btnSendFormOrder.addEventListener("click", (e) => {
  e.preventDefault();

  //Recuperation des valeurs du formulaire

  const formulaireValues = {
    prenom: document.getElementById("firstName").value,
    nom: document.getElementById("lastName").value,
    adresse: document.getElementById("address").value,
    ville: document.getElementById("city").value,
    email: document.getElementById("email").value
  }

  console.log("formulaireValues");
  console.log(formulaireValues);

  //************************ Validaion du formulaire*******

  //Const message alert :

  const textAlert = (value) => {
    return `${value}:Les chiffres et les symboles ne sont pas autorisés. Minimum 2 caractères, maximum 30`;
  }

  const erreurPrenom = document.getElementById("firstNameErrorMsg");
  const erreurNom = document.getElementById("lastNameErrorMsg");
  const erreurAdresse = document.getElementById("addressErrorMsg");
  const erreurVille = document.getElementById("cityErrorMsg");
  const erreurEmail = document.getElementById("emailErrorMsg");

  //Const regEx***


  const regExPrenomNomVille = (value) => {
    return /^[A-Za-z]{2,30}$/.test(value);
  }

  const regExAdresse = (value) => {
    return /^[A-Za-z0-9\s]{2,50}$/.test(value);
  }


  const regExEmail = (value) => {
    return /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  }
  //********* Function controle formulaire */

  function prenomControle() {
    //Controle de la validité du prénom
    const lePrenom = formulaireValues.prenom;
    if (regExPrenomNomVille(lePrenom)) {
      return true;
    } else {
      alert(textAlert("Prenom"));
      return false;
    };
  }
  function nomControle() {
    //Controle de la validité du nom
    const leNom = formulaireValues.nom;
    if (regExPrenomNomVille(leNom)) {
      return true;
    } else {
      alert(textAlert("Nom"));
      return false;
    };
  }

  function villeControle() {
    //Controle de la validité de la ville
    const laVille = formulaireValues.ville;
    if (regExPrenomNomVille(laVille)) {
      return true;
    } else {
      alert(textAlert("Ville"));
      return false;
    };
  }

  //Controle de la validité de l'adresse
  function adresseControle() {
    const lAdresse = formulaireValues.adresse;
    if (regExAdresse(lAdresse)) {
      return true;
    } else {
      alert("L'adresse n'est pas correcte");
      return false;
    };
  }

  //Controle de la validité de l'email
  function emailControle() {
    const lEmail = formulaireValues.email;
    if (regExEmail(lEmail)) {
      return true;
    } else {
      alert("L'adresse mail n'est pas correcte")
      return false;
    }

  }


  if (prenomControle() && nomControle() && emailControle() && villeControle() && adresseControle()) {
    //Mettre l'objet "formulaireValues" dans le localStorage 
    localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues));
  } else {
    alert("Veuillez remplir tous les champs du formulaire");
  }



  //***************************Fin de validation formularire****************




















  //récupération des valeurs du formulaire pour les mettre dans le localstorage
  //localStorage.setItem("firstName", document.getElementById("firstName").value);
  //console.log(document.getElementById("firstName").value);
  //localStorage.setItem("lastName", document.getElementById("lastName").value);
  //localStorage.setItem("address", document.getElementById("address").value);
  //localStorage.setItem("city", document.getElementById("city").value);
  //localStorage.setItem("email", document.getElementById("email").value);

  //Mettre les values du formulaire dans un objet
  //const formulaire = {
  //prenom: localStorage.getItem("firstName"),
  //nom: localStorage.getItem("lastName"),
  //adresse: localStorage.getItem("address"),
  //ville: localStorage.getItem("city"),
  //email: localStorage.getItem("email"),
  //}
  //console.log("formulaire");
  //console.log(formulaire);

  //Mettre le contenu du formulaire et le produit selectionné dans un objet à envoyer au serveur

  const aEnvoyer = {
    productInLocalStorage,
    formulaireValues
  }

  console.log("aEnvoyer");
  console.log(aEnvoyer);
})

//---------Mettre le contenu du localstorage dans le formulaire------
// Prendre la key du local storage et la mettre dans un variable
const dataLocalStorage = localStorage.getItem("formulaireValues");

//Convertir la chaine de caractère en objet javascript

const dataLocalStorageObjet = JSON.parse(dataLocalStorage);

console.log("dataLocalStorageObjet");
console.log(dataLocalStorageObjet);

//Mettre les values du localstorage dans les champs du formulaire
document.getElementById("firstName").value = dataLocalStorageObjet.prenom;
document.getElementById("lastName").value = dataLocalStorageObjet.nom;
document.getElementById("address").value = dataLocalStorageObjet.adresse;
document.getElementById("city").value = dataLocalStorageObjet.ville;
document.getElementById("email").value = dataLocalStorageObjet.email;


//Fonction pour remplir directement le champ du formulaire avec les données du local storage si elles existent

//function remplirChampInputDepuisLocalStorage(input) {
  //document.getElementById(`${input}`).value = dataLocalStorageObjet[input];
//};

//console.log("remplirchamp");
//console.log(remplirChampInputDepuisLocalStorage);
//remplirChampInputDepuisLocalStorage("prenom");






/*
const contact = {
  firstName: "Heri",
  lastName: "Setyobudi",
  address: "2 Rue de Paname",
  city: "Paris",
  email: "hstybd@gmail.com"
}


const products = [

];
console.log(products);
products.push("chat")
console.log(products);
products.push("chien");
console.log(products);
*/

//btnSendFormOrder.addEventListener("click", (e) => {
  //e.preventDefault();

  //localStorage.setItem("firstName", document.querySelector("firstName").value);
  //localStorage.setItem("lasttName", document.querySelector("lastName").value);



//});





