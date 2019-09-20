// window.localStorage.clear();

window.onload = function() {
  document.querySelector("#focus").focus();
};

// -------- variables -------- //
let addedClient;
let list;
let clientNumber;
let buttonRefresh = document.querySelector("#buttonRefresh");
let add = document.querySelector(".form__wrapper");
let form = document.querySelector("form");

let serviced1;
let serviced2;
let serviced3;

let spec1 = "Specialistas 1";
let spec2 = "Specialistas 2";
let spec3 = "Specialistas 3";


checkForLocalStorage();


// -------- change status of first client to "serviced" -------- //
function findServiced(specialist) {
  let filtered1 = list.filter(clients => clients.specialistAssigned == specialist);
  let filteredServiced = filtered1.find(clients => clients.status == "serviced");
  if (!filteredServiced) {
    serviced1 = filtered1.find(clients => clients.status == "waiting");
  }
  if (serviced1) {
    serviced1.status = "serviced";
  }
};

// -------- check if there is a client list in localStorage -------- //
function checkForLocalStorage() {
  if (localStorage.list) {
    list = JSON.parse(localStorage.getItem('list'));
    clientNumber = (list[list.length - 1].number) + 1;
    buttonRefresh.classList.add("button--side");
    add.classList.remove("hidden");
    console.log(list);
  }
  if (!localStorage.list) {
    buttonRefresh.classList.remove("button--side");
    add.classList.add("hidden");
  }
};

// -------- get dummy list -------- //
buttonRefresh.addEventListener("click", function() {

  let xhr = new XMLHttpRequest;
  xhr.open('GET', '../../dummyList.json', true)
  // xhr.open('GET', 'http://egleba.lt/test/dummyList.json', true)

  xhr.onload = function() {
    if (this.status === 200) {
      let list = JSON.parse(this.responseText)
      localStorage.setItem('list', JSON.stringify(list));
      getList();
      buttonRefresh.classList.add("button--side");
      add.classList.remove("hidden");
      findServicedAll();
    } else {
      alert("Nepavyko nuskaityti lankytojų duomenų");
    }
  }
  xhr.send();
  alert("Pavyzdiniai duomenys sėkmingai įkrauti");
});


// -------- change status of all first clients to "serviced" -------- //
function findServicedAll() {
  findServiced(spec1);
  findServiced(spec2);
  findServiced(spec3);

  localStorage.setItem('list', JSON.stringify(list));
  getList();
};


// -------- update client list from localStorage -------- //
function getList() {
  list = JSON.parse(localStorage.getItem('list'));
  clientNumber = (list[list.length - 1].number) + 1;
};


// -------- add new client -------- //

form.addEventListener("submit", function(event) {
  let output = document.querySelector('input[name="radio"]:checked').value;
  addedClient = {
    "number": clientNumber,
    "specialistAssigned": output,
    "status": "waiting"
  };
  list.push(addedClient);
  clientNumber = clientNumber + 1;

  findServiced(spec1);
  findServiced(spec2);
  findServiced(spec3);

  localStorage.setItem('list', JSON.stringify(list));
  alert("Užregistruota sėkmingai!");

  event.preventDefault();
}, false);
