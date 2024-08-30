const url = "https://jsonplaceholder.typicode.com/photos";

async function getPhotos() {
    try {
       const response = await axios(url);
       console.log(response);
        
    } catch (error) {
        console.log(error);
        
    }
}

getPhotos();

const apiKey = "da0f65ed4b45ea3638f9a720a325a3c8";
const url = ""