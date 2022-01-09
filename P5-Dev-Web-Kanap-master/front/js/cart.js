let getProductInLocalStorage = JSON.parse(localStorage.getItem("product"));
console.log(getProductInLocalStorage);



// ID où on va injecter HTML
const productsInCart = document.querySelector("#cart__items");
//console.log(productsInCart);

if (getProductInLocalStorage === null) {
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

  for (let product of getProductInLocalStorage) {
    structureProductsCart.innerHTML += `
    <article class="cart__item" data-id="${product._id}" data-color="${product.colorChoice}">
    <div class="cart__item__img">
      <img src= ${product.image} alt= ${product.altTxt}>
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${product.name}</h2>
        <p>Prix : ${product.price} € / article </p>
        <p>Couleur : ${product.colorChoice}</p>

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

}



//*****************Suppression de produit********************
function deleteProduct() {
  let buttonSupprimer = document.querySelectorAll(".deleteItem");

  for (let s = 0; s < buttonSupprimer.length; s++) {
    buttonSupprimer[s].addEventListener("click", (event) => {
      event.preventDefault();

      //Selection de l'element à supprimer en fonction de son id ET sa couleur
      let idDelete = getProductInLocalStorage[s].idProduct;
      let colorDelete = getProductInLocalStorage[s].colorChoice;

      getProductInLocalStorage = getProductInLocalStorage.filter(el => el.idProduct !== idDelete || el.colorChoice !== colorDelete);

      localStorage.setItem("product", JSON.stringify(getProductInLocalStorage));
      location.reload();
    })
  }
}
deleteProduct();

//*************Modification de quantité de produit*******
function modifQuantity() {
  let mdfQtt = document.querySelectorAll(".itemQuantity");

  for (let m = 0; m < mdfQtt.length; m++) {
    mdfQtt[m].addEventListener("change", (event) => {
      event.preventDefault();

      //Selection de l'element à modifier en fonction de son id et sa couleur
      let quantityModif = getProductInLocalStorage[m].quantity;
      let qttModifValue = mdfQtt[m].valueAsNumber;

      const resultFind = getProductInLocalStorage.find((el) => el.qttModifValue !== quantityModif);

      resultFind.quantity = qttModifValue;
      getProductInLocalStorage[m].quantity = resultFind.quantity;

      localStorage.setItem("product", JSON.stringify(getProductInLocalStorage));
      // refresh rapide
      location.reload();
    })
  }
}
modifQuantity();

//********************** */

function getTotals() {

  // Récupération du total des quantités
  let elemsQtt = document.getElementsByClassName('itemQuantity');
  let myLength = elemsQtt.length,
    totalQtt = 0;

  for (let t = 0; t < myLength; ++t) {
    totalQtt += elemsQtt[t].valueAsNumber;
  }

  let productTotalQuantity = document.getElementById('totalQuantity');
  productTotalQuantity.innerHTML = totalQtt;
  console.log(totalQtt);


  // Récupération du prix total
  totalPrice = 0;

  for (let t = 0; t < myLength; ++t) {
    totalPrice += (elemsQtt[t].valueAsNumber * getProductInLocalStorage[t].price);
  }

  let productTotalPrice = document.getElementById('totalPrice');
  productTotalPrice.innerHTML = totalPrice;
  console.log(totalPrice);
}
getTotals();




//**************** Formulaire*****************

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
    return `${value}:Minimum 2 caractères, maximum 30. Les chiffres et les symboles ne sont pas autorisés. `;
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
      //alert(textAlert("Prenom"));
      erreurPrenom.innerHTML = "Minimum 2 caractères, maximum 30. Les chiffres et les symboles ne sont pas autorisés. ";
      return false;
    };
  }
  function nomControle() {
    //Controle de la validité du nom
    const leNom = formulaireValues.nom;
    if (regExPrenomNomVille(leNom)) {
      return true;
    } else {
      //alert(textAlert("Nom"));
      erreurNom.innerHTML = "Minimum 2 caractères, maximum 30. Les chiffres et les symboles ne sont pas autorisés. ";
      return false;
    };
  }

  //Controle de la validité de l'adresse
  function adresseControle() {
    const lAdresse = formulaireValues.adresse;
    if (regExAdresse(lAdresse)) {
      return true;
    } else {
      //alert("L'adresse n'est pas correcte");
      erreurAdresse.innerHTML = "L'adresse n'est pas correcte";
      return false;
    };
  }

  function villeControle() {
    //Controle de la validité de la ville
    const laVille = formulaireValues.ville;
    if (regExPrenomNomVille(laVille)) {
      return true;
    } else {
      //alert(textAlert("Ville"));
      erreurVille.innerHTML = "Minimum 2 caractères, maximum 30. Les chiffres et les symboles ne sont pas autorisés. ";
      return false;
    };
  }

  //Controle de la validité de l'email
  function emailControle() {
    const lEmail = formulaireValues.email;
    if (regExEmail(lEmail)) {
      return true;
    } else {
      //alert("L'adresse mail n'est pas correcte")
      erreurEmail.innerHTML = "L'adresse mail n'est pas correcte";
      return false;
    }

  }

  if (prenomControle() && nomControle() && emailControle() && villeControle() && adresseControle()) {
    //Mettre l'objet "formulaireValues" dans le localStorage 
    localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues));
  } else {
    alert("Veuillez vérifier le formulaire");
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
    getProductInLocalStorage,
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
  "77711f0e466b4ddf953f677d30b0efc9", "77711f0e466b4ddf953f677d30b0efdd"

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





