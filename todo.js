let Clock = document.getElementById("clock");
let form = document.getElementById("form");
let formEdit = document.getElementById("form-edit");
let date = document.getElementById("date");
let bten = document.querySelector("button");
let btenEdit = document.getElementById("bbb");
let Message = document.querySelector("input");
let Edittodolist = document.getElementById("card");
let closebtn = document.getElementById("btnx");
let Overleytodolist = document.getElementById("overlay");
const f = document.getElementById("foo");
let todos = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];

// Clock and Date
function getFullDay() {
  const now = new Date();
  const hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
  const minut =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  const seconds =
    now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
  const day = now.getDate();
  const month =
    now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth();
  const year = now.getFullYear();
  Clock.textContent = `${hour}:${minut}:${seconds}`;
  let Strmonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const months = now.getMonth();
  date.textContent = `${Strmonths[months]} ${day} , ${year}`;

  return `${Strmonths[months]} ${day}, ${hour}:${minut}`;
}

setInterval(getFullDay,1000)

// Input and show erors

function showMessage(where, message) {
  document.getElementById(`${where}`).textContent = message;
  setTimeout(() => {
    Message.style.border = "";
    formEdit["form-edit"].style.border = "";
    document.getElementById(`${where}`).textContent = "";
  }, 2500);
}

bten.addEventListener("click", (e) => {
  e.preventDefault();
  let message = Message.value.trim();
  form.reset();
  if (message == "") {
    showMessage("Showerror", "Something is wrong !");
    Message.style.border = "2.5px solid red";
  } else {
    todos.push({ text: message, time: getFullDay() });
    settodos();
    Showtodods();
  }
});

// Show todods

function Showtodods() {
  let todos = JSON.parse(localStorage.getItem("list"));
  let lists = document.getElementById("lists");
  lists.innerHTML = "";
  todos.forEach((item, i) => {
    lists.innerHTML += `
          <li class="list-group-item li">${item.text} 
                         <div class="icon" >
                              <p class="d-inline ">${item.time}</p>
                              <i onclick='Deltodos(${i})' class="fa-solid fa-trash-can face front back"></i>
                              <i onclick='Edittodos(${i})'class="fa-solid fa-pen"></i>
                         </div>  
                    </li>
          `;
  });
}
Showtodods();

function settodos() {
  localStorage.setItem("list", JSON.stringify(todos));
}

//  Delete todos

function Deltodos(id) {
  const deletetodos = todos.filter((item, i) => {
    return i !== id;
  });
  todos = deletetodos;
  settodos();
  Showtodods();
}

// Edit todos
btenEdit.addEventListener("click", (e) => {
  e.preventDefault();
  const message = formEdit["form-edit"].value.trim();
  formEdit.reset();
  if (message == "") {
    formEdit["form-edit"].style.border = "2.5px solid red";
    showMessage("Editerror", "Something is wrong in editting !");
  } else {
    todos.splice(Index, 1, {
      text: message,
      time: getFullDay(),
    });
    settodos();
    Showtodods();
    close();
  }
});

closebtn.addEventListener("click", close);

document.addEventListener(
  "click",
  (ev) => {
    f.style.transform = `translateY(${ev.clientY - 25}px)`;
    f.style.transform += `translateX(${ev.clientX - 25}px)`;
  },
  false
);

function Edittodos(id) {
  open();
  Index = id;
}

function open() {
  Edittodolist.classList.remove("hidden");
  Overleytodolist.classList.remove("hidden");
}

function close() {
  Edittodolist.classList.add("hidden");
  Overleytodolist.classList.add("hidden");
}
