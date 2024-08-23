const url = "https://solar-poised-salad.glitch.me/products/";

const productList = document.getElementById('product-list');

// Render products on the page
function render(products){
    products.forEach((product) => {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item");
        productItem.innerHTML=`
            <img src="${product.imageUrl}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <div class="price">$${product.price}</div>
            <div class="actions">
              <button class="editbtn" data-id="${product.id}">Edit</button>
              <button class="dltbtn" data-id="${product.id}">Delete</button>
            </div>`;
        productList.appendChild(productItem);
    });

    // Add event listeners to delete buttons
    const deleteButtons = document.querySelectorAll(".dltbtn");
    deleteButtons.forEach(button => {
        button.addEventListener("click", deleteProduct);
    });

    // Add event listeners to edit buttons
    const editButtons = document.querySelectorAll(".editbtn");
    editButtons.forEach(button => {
        button.addEventListener("click", editProduct);
    });
}

// Fetch product data
async function getData() {
    try{
        const res = await fetch(url);
        const data = await res.json();
        render(data);
    } catch(error) {
        console.log(error);
    }
} 

// Function to delete a product
async function deleteProduct(event) {
    const productId = event.target.dataset.id;
    try {
        const res = await fetch(url + productId, {
            method: "DELETE",
        });
        if (res.ok) {
            // Remove the product from the DOM
            event.target.closest(".product-item").remove();
        } else {
            console.log("Failed to delete the product.");
        }
    } catch (error) {
        console.log(error);
    }
}

// Function to edit a product
function editProduct(event) {
    const productId = event.target.dataset.id;
    const productItem = event.target.closest(".product-item");

    const title = prompt("Enter new title:", productItem.querySelector("h2").innerText);
    const description = prompt("Enter new description:", productItem.querySelector("p").innerText);
    const price = prompt("Enter new price:", productItem.querySelector(".price").innerText.replace('$', ''));
    const imageUrl = prompt("Enter new image URL:", productItem.querySelector("img").src);

    if (title && description && price && imageUrl) {
        const updatedProduct = {
            title,
            description,
            price: parseFloat(price),
            imageUrl
        };

        updateProduct(productId, updatedProduct);
    }
}

// Function to update a product
async function updateProduct(productId, updatedProduct) {
    try {
        const res = await fetch(url + productId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedProduct)
        });
        if (res.ok) {
            // Re-fetch and re-render the products
            productList.innerHTML = '';
            getData();
        } else {
            console.log("Failed to update the product.");
        }
    } catch (error) {
        console.log(error);
    }
}

getData();