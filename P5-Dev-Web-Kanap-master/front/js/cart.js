let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
console.log(productInLocalStorage);

// ID où on va injecter HTML
const productsInCart = document.querySelector("#cart__items");
console.log(productsInCart);



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
    let structureProductsCart = [];

    for (k = 0; k < productInLocalStorage.length; k++); {
        structureProductsCart = structureProductsCart + `
        <div class="cart__item__img">
                  <img src="$../images/product01.jpg" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>Nom du produit</h2>
                    <p>42,00 €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
        
        `;
    }
    if (k == productInLocalStorage.length) {
        productsInCart.innerHTML = structureProductsCart;
    }

}
