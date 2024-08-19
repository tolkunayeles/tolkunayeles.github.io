const getUser = function () {
    fetch ("https://randomuser.me/api/?results=5")
    .then ((result) => result.json())
    .then ((data) => {
        let rest = data.results
  for (let key in rest) {
    const findItem = rest[key]
        let {
            picture: { large },
            name: { first, last },
            email,
            cell,
            location: { city, state, country },
        
        } = findItem;

        const userTemplate = `
        <div class="profile-card">
        <img src="${large}" alt="Profile Photo">
        <h2 class="user-name">${first} ${last}</h2>
        <div class="details">
            <div>Email: <span>${email}</span></div>
            <div>City: <span>${city}</span></div>
            <div>State: <span>${state}</span></div>
            <div>Country: <span>${country}</span></div>
            <div>Phone: <span>${cell}</span></div>
        </div>
        </div>`;
        document.body.insertAdjacentHTML("beforeend", userTemplate);
    }
    })
    .catch((error) => console.log(error));
};
getUser();