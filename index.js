// function checkThreeAndTwo(arr) {
//     let count = {};
//     for (let i = 0; i < arr.length; i++) {
//         const char = arr[i];
       
//         count[char] = (count[char] || 0) + 1;
//     }

//     // Get the values from the count object
//     const values = Object.values(count);

//     // Check if the array contains exactly one 3 and one 2
//     return values.includes(3) && values.includes(2);
// }

// // Test cases
// console.log(checkThreeAndTwo(["a", "a", "a", "b", "b"])); // true
// console.log(checkThreeAndTwo(["a", "b", "c", "b", "c"])); // false
// console.log(checkThreeAndTwo(["a", "a", "a", "a", "a"])); // false

const makeNegative = (num) => num > 0 ? -num : num;

// Example usage:
console.log(makeNegative(5));   // Output: -5
console.log(makeNegative(-3));  // Output: -3
console.log(makeNegative(0));   // Output: 0

function areTheyInLove(timmyPetals, sarahPetals) {
    // Check if one of the numbers is even and the other is odd
    if ((timmyPetals % 2 === 0 && sarahPetals % 2 !== 0) ||
        (timmyPetals % 2 !== 0 && sarahPetals % 2 === 0)) {
        return true; // They are in love
    } else {
        return false; // They are not in love
    }
}

// Example usage:
const timmyPetals = 8;
const sarahPetals = 9;
console.log(areTheyInLove(timmyPetals, sarahPetals)); // Output: true


async function openModal(movieId) {
    try {
        const res = await fetch(
            `${movieDetailsUrl}${movieId}?api_key=${apiKey}&language=en-US&append_to_response=videos,credits`
        );
        const movie = await res.json();

        modalContent.innerHTML = `
            <img src="${movie.poster_path ? imageBaseUrl + movie.poster_path : 'https://via.placeholder.com/500x750'}" alt="${movie.title}">
            <div class="details">
                <h2>${movie.title}</h2>
                <p>${movie.overview}</p>
                <p><strong>Release Date:</strong> ${movie.release_date}</p>
                <p><strong>Runtime:</strong> ${movie.runtime} minutes</p>
                <p><strong>Genres:</strong> ${movie.genres.map((genre) => genre.name).join(", ")}</p>
                <p><strong>Cast:</strong> ${movie.credits.cast.slice(0, 5).map((actor) => actor.name).join(", ")}</p>
            </div>
        `;

        modal.style.display = "block";
    } catch (error) {
        console.error("Error fetching movie details:", error);
    }
}

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
