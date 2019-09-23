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
let alertBoxes = document.querySelector(".alert-boxes");
let alertBox = document.querySelector(".alert-box");

let serviced;

let spec1 = "Specialistas 1";
let spec2 = "Specialistas 2";
let spec3 = "Specialistas 3";

checkForLocalStorage();


// -------- change status of first client to "serviced" -------- //
function findServiced(specialist) {
  let filtered = list.filter(clients => clients.specialistAssigned == specialist);
  let filteredServiced = filtered.find(clients => clients.status == "serviced");
  if (!filteredServiced) {
    serviced = filtered.find(clients => clients.status == "waiting");
  }
  if (serviced) {
    serviced.status = "serviced";
    let startTime = new Date();
    serviced.timeServiced = startTime;
  }
};

// -------- check if there is a client list in localStorage -------- //
function checkForLocalStorage() {
  if (localStorage.list) {
    list = JSON.parse(localStorage.getItem('list'));
    clientNumber = (list[list.length - 1].number) + 1;
    buttonRefresh.classList.add("button--side");
    add.classList.remove("hidden");
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
  // xhr.open('GET', 'http://egleba.lt/nfq/dummyList.json', true)

  xhr.onload = function() {
    if (this.status === 200) {
      let list = JSON.parse(this.responseText)
      localStorage.setItem('list', JSON.stringify(list));
      getList();
      buttonRefresh.classList.add("button--side");
      add.classList.remove("hidden");
      findServicedAll();
      alert("Pavyzdiniai duomenys sėkmingai įkrauti");
    } else {
      alert("Nepavyko nuskaityti lankytojų duomenų");
    }
  }
  xhr.send();

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
    "status": "waiting",
    "timeServiced": 0
  };
  list.push(addedClient);

  findServicedAll();

  localStorage.setItem('list', JSON.stringify(list));
  alert(`Lankytojas numeris ${clientNumber} užregistruotas sėkmingai!`);
  event.preventDefault();
}, false);


// -------- alert -------- //
function alert(anyText) {
  let div = document.createElement("div");
  div.classList.add("alert-box");
  div.innerHTML = anyText;
  alertBoxes.appendChild(div);
  setTimeout(function() {
    alertBoxes.removeChild(div);
  }, 1950);
};
