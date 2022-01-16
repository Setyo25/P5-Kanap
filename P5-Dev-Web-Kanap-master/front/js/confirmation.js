let orderId = document.getElementById("orderId");

let searchParams = new URLSearchParams(window.location.search);

orderId.innerHTML = searchParams.get("commande");
localStorage.remove();

