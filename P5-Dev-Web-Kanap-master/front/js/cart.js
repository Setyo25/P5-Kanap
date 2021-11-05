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
    <article class="cart__item" data-id="{product-ID}">
    <div class="cart__item__img">
      ${product.affichagePhoto}
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${product.name}</h2>
        <p>${product.price} €</p>
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

// total quantite dans le panier 

let totalQuantityCalcule = [];

//Chercher la quantite dans le panier

for (let n = 0; n < productInLocalStorage.length; n++) {
  let quantityOfProductsInCart = productInLocalStorage[n].quantity;

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

