const url = "https://solar-poised-salad.glitch.me/Tolkunay/";

const image = document.querySelector('#product-image');
const title = document.querySelector('#product-title');
const price = document.querySelector('#product-price');
const form = document.querySelector('form');
const productList = document.querySelector('#product-list');

// Add event listener for form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const product = {
        imageUrl: image.value,
        title: title.value,
        price: price.value,
    };
    addProduct(product);
});

// Function to add a product
const addProduct = async (product) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });
        const data = await response.json();
        
        // Show an alert after adding the product
        alert("Product added successfully!");

        // Clear the input fields
        image.value = '';
        title.value = '';
        price.value = '';

        // Fetch and display the updated product list
        displayProducts();
    } catch (error) {
        console.log(error);
    }
};
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
// Function to fetch and display products
const displayProducts = async () => {
    try {
        const response = await fetch(url);
        const products = await response.json();

        // Clear the product list before rendering
        productList.innerHTML = '';

        // Loop through products and display each one
        products.forEach((product) => {
            const productItem = `
                <div class="product-item">
                    <img src="${product.imageUrl}" alt="${product.title}">
                    <div class="product-details">
                        <h2>${product.title}</h2>
                        <p class="price">$${product.price}</p>
                        <div class="buttons">
                            <button data-id="${product.id}" onclick="editProduct(event)" class="edit-button">Edit</button>
                            <button data-id="${product.id}" onclick="deleteProduct(event)" class="delete-button">Delete</button>
                        </div>
                    </div>
                </div>
            `;
            productList.innerHTML += productItem;
        });
    } catch (error) {
        console.log("Error fetching products:", error);
    }
};

// Fetch and display products on page load
window.onload = displayProducts;

// Function to edit a product (optional)
function editProduct(event) {
    const productId = event.target.dataset.id;
    const productItem = event.target.closest(".product-item");

    const title = prompt("Enter new title:", productItem.querySelector("h2").innerText);
    const price = prompt("Enter new price:", productItem.querySelector(".price").innerText.replace('$', ''));
    const imageUrl = prompt("Enter new image URL:", productItem.querySelector("img").src);

    if (title && price && imageUrl) {
        const updatedProduct = {
            title,
            price: parseFloat(price),
            imageUrl
        };
        updateProduct(productId, updatedProduct);
    }
}

// Function to update a product (optional)
const updateProduct = async (id, updatedProduct) => {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });

        const data = await response.json();
        console.log("Product updated:", data);
        displayProducts(); // Refresh product list after updating
    } catch (error) {
        console.log("Error updating product:", error);
    }
};