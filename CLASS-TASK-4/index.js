const url = "https://solar-poised-salad.glitch.me/students"
const fullname = document.querySelector('#fullname');
const email = document.querySelector('#email');
const saveBtn = document.querySelector('#save');
const updateBtn = document.querySelector('#updatebtn');
const getStudent = () =>{
    fetch(url)
    .then ((res) => res.json())
    .then ((data)=> {
        const ul = document.querySelector("ul");
        ul.innerHTML="";

        data.forEach(item => {
            if (item.fullname!== "" && item.email !=="") {
                const li = `<li>${item.id}-${item.fullname}-${item.email}</li>`;
                ul.insertAdjacentHTML ("beforeend", li)
            }
        });
    })
    .catch((error)=>console.log(error));
    
};
getStudent();

function addStudent ()  {
    const student = {
        fullname: fullname.value,
        email: email.value,
        isActive: true
}
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(student),
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));  
};
saveBtn.addEventListener("click", function() { 
    addStudent();
})

const updateStudent = () => {
    const updatedStudent = {
        fullname:"Tolkunay Elebesova",
        email: "naya@gmail.com",
    };
    fetch (url +"/5", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStudent),
    })
    .then((res) =>res.json())
    .then((data) => {
        console.log(data);
        getStudent();
    })
    .catch((error)=>console.log(error));
};

updateBtn.addEventListener("click", updateStudent)

