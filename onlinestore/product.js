const url = "https://solar-poised-salad.glitch.me/Tolkunay/";
let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
const listProductHTML = document.querySelector('.listProduct');

let listProducts = []; // Array to hold the fetched products

const cartList = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span');

let carts = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

function render(products) {
    listProducts = products; // Store the fetched products in the listProducts array
    products.forEach((product) => {
        // Create a new div element for each product item
        const productItem = document.createElement("div");
        productItem.classList.add("item");
        productItem.dataset.id = product.id;
        productItem.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.title}">
            <h2>${product.title}</h2>
            <div class="price">$${product.price}</div>
            <button class="addCart">Add To Cart</button>
        `;
        
        // Append the productItem to the productList
        listProductHTML.appendChild(productItem);
    });
}

listProductHTML.addEventListener("click", (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id); // Call addToCart when a product is added to the cart
    }
});

const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if (positionThisProductInCart < 0) {
        // If product is not in the cart, add it
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        // If product is already in the cart, increment the quantity
        carts[positionThisProductInCart].quantity += 1;
    }
    addCartToHTML();
    addCartToMemory();
}

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
}

const addCartToHTML = () => {
    cartList.innerHTML = ''; // Clear the cart list
    let totalQuantity = 0;
    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity += cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
            let info = listProducts[positionProduct];
            newCart.innerHTML = `
                <div class="image">
                    <img src="${info.imageUrl}" alt="">
                </div>
                <div class="name">
                    ${info.title}
                </div>
                <div class="totalPrice">
                    $${info.price * cart.quantity}
                </div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${cart.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
            cartList.appendChild(newCart);
        });
    }
    iconCartSpan.innerText = totalQuantity;
}

cartList.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.closest('.item').dataset.id;
        let type = positionClick.classList.contains('plus') ? 'plus' : 'minus';
        changeQuantity(product_id, type);
    }
});

const changeQuantity = (product_id, type) => {
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        if (type === 'plus') {
            carts[positionItemInCart].quantity += 1;
        } else {
            let newQuantity = carts[positionItemInCart].quantity - 1;
            if (newQuantity > 0) {
                carts[positionItemInCart].quantity = newQuantity;
            } else {
                carts.splice(positionItemInCart, 1); // Remove item from cart if quantity is 0
            }
        }
        addCartToMemory();
        addCartToHTML();
    }
}

// Fetch product data
async function getData() {
    try {
        const res = await fetch(url);
        const data = await res.json();
        render(data);
        if (localStorage.getItem('cart')) {
            carts = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    } catch (error) {
        console.log(error);
    }
}

getData(); // Call getData to fetch products on page load