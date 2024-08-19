// fetch(""https://dog.ceo/api/breeds/image/random", 
//     {method: "GET"})
// .then((result) => {
//     return result.json();
// })
// .then ((data) => {
//     console.log(data);
// })
// .catch((error) => {
//     console.log(error);
// })

document.querySelector("#getDog").addEventListener("click",()=> {
    fetch("https://dog.ceo/api/breeds/image/random")
    .then(result => result.json())
    .then ((data) =>document.querySelector("img").setAttribute("src", data.message))
    .catch((error) => console.log(error))
        
});
