const url = "https://solar-poised-salad.glitch.me/todos";

const myInput = document.querySelector("input");
const myBtn = document.querySelector("button");
const notification = document.querySelector(".alert");
const notificationText = document.querySelector(".alert p");
const ul = document.querySelector("ul");
const updateBtn = document.querySelector("#save")
let currentChangingTodo = null;

function notificationFn(message, color) {
    
      notificationText.textContent = message;
      notification.style.display = "flex";
      notification.style.backgroundColor = color;

      setTimeout(() => {
        notification.style.display = "none";
      }, 3000);
}
const render = (todos) => {
  ul.innerHTML = "";
  todos.forEach((element) => {
    const li = `<li>${element.title} <input type="checkbox" ${
      element.completed ? "checked" : ""
    } /> <button class="edit-btn" id="${element.id}">Edit</button>
    <button class="delete-btn" data-index="${element.id}">Delete</button></li></li>
    `;
    ul.insertAdjacentHTML("beforeend", li);
  });

  const editBtns = document.querySelectorAll(".edit-btn");
  const deleteBtns = document.querySelectorAll(".delete-btn");

  editBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        currentChangingTodo = todos.find(
            (todo) => todo.id === parseInt(e.target.id)
        );
        myInput.value = currentChangingTodo.title;
    });
  });

  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const itemId = e.target.dataset.index;
        fetch(url + "/" + itemId, {
            method: "DELETE",
        })
        .then(res => res.json())
        .then(() => {
            notificationFn("Todo successfully deleted", "aqua")
            getTodos();
        })
        .catch((error) => console.log(error));
        
    });
  });
};
// render todos function
const getTodos = () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => render(data))
    .catch((error) => console.log(error));
};

getTodos();

//
const addTodo = () => {
  // logic for adding todo to database
  const todo = {
    title: myInput.value,
    completed: false,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  })
    .then((res) => res.json())
    .then(() => {
      myInput.value = "";
      notificationFn("Todo successfully added", "green")

      getTodos();
    })
    .catch((error) => console.log(error));
};

myBtn.addEventListener("click", addTodo);

const updateTodo = () => {
    if (currentChangingTodo !== null) {
        const updatedTodo = {
            title: myInput.value,
            completed: false,
        };
            
        fetch (url + "/" + currentChangingTodo.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTodo),
        })
        .then((res) =>res.json())
        .then((data) => {
            myInput.value = "";
            getTodos()
            notificationFn("Todo successfully updated", "green")
        })
        .catch((error)=>console.log(error));
    } else {
        notificationFn("First click on edit button", "red")
    }
};
updateBtn.addEventListener("click", updateTodo)

