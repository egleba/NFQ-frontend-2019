// -------- variables -------- //
let display = document.querySelector(".display");
let list;
let clientNumber;
let serviced;

let spec1 = "Specialistas 1";
let spec2 = "Specialistas 2";
let spec3 = "Specialistas 3";
let avg;

// -------- change status of first client to "serviced" -------- //
function findServiced(specialist) {
  let filtered = list.filter(clients => clients.specialistAssigned == specialist);
  let filteredServiced = filtered.find(clients => clients.status == "serviced");
  if (!filteredServiced) {
    serviced = filtered.find(clients => clients.status == "waiting");
  }
  if (serviced) {
    serviced.status = "serviced";
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
    timeToWait();
    renderHTML(list);
    clientNumber = (list[list.length - 1].number) + 1;
  }
checkIfDisplayEmpty();
};


// -------- count average time previous clents have been served -------- //
function timeToWait() {
  let timesList = list.filter(times => times.status == "done");
  let times = [];
  for (let i = 0; i < timesList.length; i++) {
    times.push(timesList[i].timeServiced);
  }
  if (times.length > 0) {
    let sum = times.reduce((previous, current) => current += previous);
    avg = sum / times.length;
    return avg;
  }
}

// -------- display client list -------- //
function renderHTML(stuff) {
  let thisAvg = avg;

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
      let li3 = document.createElement("li");

      ul.classList.add("display__item");
      li.classList.add("display__specialist");
      li2.classList.add("display__number");
      li3.classList.add("display__time");


      display.appendChild(ul);
      li.innerHTML = stuff[i].specialistAssigned;
      ul.appendChild(li);
      li2.innerHTML = stuff[i].number;
      ul.appendChild(li2);

      if (avg > 0) {
        if (thisAvg <= 60) {
          li3.innerHTML = "Laukti liko apie " + Math.round(thisAvg) + " sec.";
        } else if (thisAvg > 60 && thisAvg <= 3600) {
          li3.innerHTML = "Laukti liko apie " + Math.round(thisAvg / 60) + " min.";
        } else {
          li3.innerHTML = "Laukti liko apie " + Math.round(thisAvg / 3600) + " val.";
        }
        ul.appendChild(li3);
        thisAvg = thisAvg + avg;
      }
    }
  }
  checkIfDisplayEmpty();
};


// -------- update client list from localStorage -------- //
function getList() {
  list = JSON.parse(localStorage.getItem('list'));
  clientNumber = (list[list.length - 1].number) + 1;
};

function checkIfDisplayEmpty() {
  if (display.innerHTML == 0) {
    display.innerHTML = "Lankytojų nėra.";
  }
}
