
let carticon = document.querySelector("#carticon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

carticon.addEventListener("click", () => {
  cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});


const addCartButton = document.querySelectorAll(".addCart");
addCartButton.forEach((addToCartButtons) => {
  addToCartButtons.addEventListener("click", addCartClick);
});

const comprar = document.querySelector(".btn-buy");
comprar.addEventListener("click",comprarBoton);

const carrito = document.querySelector(`.cart-content`);

function addCartClick(event){
  const boton = event.target;
  const item = boton.closest(".producto-box");
  const itemTitulo = item.querySelector(".product-title").textContent;
  const itemPrecio = item.querySelector(".price").textContent;
  const itemImg = item.querySelector(".product-img").src;
  
  addItemToShop(itemTitulo,itemPrecio,itemImg);

  Toastify({

    text: "Producto anadido",
    
    duration: 1500
    
    }).showToast();
  
}

function addItemToShop(itemTitulo,itemPrecio,itemImg){

  const carritoE = carrito.getElementsByClassName("cart-producto-titulo");
  
  for(let i = 0; i < carritoE.length; i++){
    if(carritoE[i].innerText === itemTitulo){
      let cantidadE = carritoE[i].parentElement.parentElement.parentElement.querySelector(".cart-cantidad");
      cantidadE.value++;
      actualizarTotal();
      return;
    }
  }

  const shoppingCart = document.createElement("div");
  const shoppingCartContent = `
  <div class="cart-content">
  <article class="cart-box">
      <img src="${itemImg}" class="cart-img">
      <div class="detail-box">
          <p class="cart-producto-titulo">${itemTitulo}</p>
          <span class="cart-price">${itemPrecio}</span>
          <input type="number" value="1" class="cart-cantidad">
      </div>
      <svg id="cart-eliminar"  xmlns="http://www.w3.org/2000/svg" width="18" height="18"
          style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
          <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z">
          </path>
      </svg>
  </article>
</div>`;
shoppingCart.innerHTML = shoppingCartContent;
carrito.append(shoppingCart);

shoppingCart.querySelector("#cart-eliminar").addEventListener("click", deleteCartItem);
shoppingCart.querySelector(".cart-cantidad").addEventListener("change",cantidadC);

actualizarTotal();

}

function deleteCartItem(e){
  const botonClick = e.target;
  botonClick.closest(".cart-box").remove();
  actualizarTotal();
}

function cantidadC(e) {
  const input = e.target;
  input.value <= 0 ? (input.value = 1) : null;
   actualizarTotal();
}

function comprarBoton () {
  swal({
    calssName:"swal-modal",
    title:"Comprado",
    text: "Compra procesada",
    icon: "success",
  });
  carrito.innerHTML = "";
  actualizarTotal();
}

function actualizarTotal(){
  let total = 0;
  const shoppingCartTotal = document.querySelector(".total");
  const shoppingCartItems = document.querySelectorAll(".cart-box");

  shoppingCartItems.forEach(shoppingCartItem => {
  const shoppingCartItemPriceE = shoppingCartItem.querySelector(".cart-price");
  const shoppingCartItemPrice = Number(shoppingCartItemPriceE.textContent.replace("$",""));
  const shoppingCartCantidadE = shoppingCartItem.querySelector(".cart-cantidad");
  const shoppingCartCantidadV = Number(shoppingCartCantidadE.value);
  total = total + (shoppingCartItemPrice * shoppingCartCantidadV);
  });
  shoppingCartTotal.innerHTML = `<h3 class="total-titulo">Total $${total.toFixed(2)}</h3>`;
}
