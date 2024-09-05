const url = "https://solar-poised-salad.glitch.me/Tolkunay/"

const image = document.querySelector('#product-image');
const title = document.querySelector('#product-title');
const price = document.querySelector('#product-price');
const form = document.querySelector('form')

form.addEventListener("submit", (e) =>{
    e.preventDefault();
    const product = {
        imageUrl: image.value,
        title: title.value,
        price: price.value,
    };
    addProduct(product)
});

const addProduct = async (tovar) => {
    try{
        const response = await fetch(url, {
            method: "POST",
            headers: {
             "Content-Type": "application/json",
            },
            body: JSON.stringify(tovar),
        });
        const data = await response.json();
        console.log(data);
    }   catch (error){
        console.log(error);   
    }
};

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

