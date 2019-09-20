// window.localStorage.clear();

// -------- variables -------- //
let display = document.querySelector(".display");

let list;
let clientNumber;

let serviced1;
let serviced2;
let serviced3;

let spec1 = "Specialistas 1";
let spec2 = "Specialistas 2";
let spec3 = "Specialistas 3";


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


// -------- change status of all first clients to "serviced" -------- //
function findServicedAll() {
  findServiced(spec1);
  findServiced(spec2);
  findServiced(spec3);

  localStorage.setItem('list', JSON.stringify(list));
  getList();
};

checkForLocalStorage();


// -------- check if there is a client list in localStorage -------- //
function checkForLocalStorage() {
  if (localStorage.list) {
    list = JSON.parse(localStorage.getItem('list'));
    findServicedAll();

    renderHTML(list);
    clientNumber = (list[list.length - 1].number) + 1;
  }
  console.log(list);
};


// -------- display client list -------- //
function renderHTML(stuff) {
  for (let i = 0; i < stuff.length; i++) {

    if (stuff[i].status == "serviced") {
      let ul = document.createElement("ul");
      let li = document.createElement("li");
      let li2 = document.createElement("li");
      ul.classList.add("display__item");
      li.classList.add("display__specialist--active");
      li2.classList.add("display__number--active");

      display.appendChild(ul);
      li.innerHTML = stuff[i].specialistAssigned;
      ul.appendChild(li);
      li2.innerHTML = stuff[i].number;
      ul.appendChild(li2);
    }
  }
  for (let i = 0; i < stuff.length; i++) {
    if (stuff[i].status == "waiting") {
      let ul = document.createElement("ul");
      let li = document.createElement("li");
      let li2 = document.createElement("li");
      ul.classList.add("display__item");
      li.classList.add("display__specialist");
      li2.classList.add("display__number");

      display.appendChild(ul);
      li.innerHTML = stuff[i].specialistAssigned;
      ul.appendChild(li);
      li2.innerHTML = stuff[i].number;
      ul.appendChild(li2)
    }
  }
};


// -------- update client list from localStorage -------- //
function getList() {
  list = JSON.parse(localStorage.getItem('list'));
  clientNumber = (list[list.length - 1].number) + 1;
};
