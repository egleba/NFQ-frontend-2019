// window.localStorage.clear();

// -------- variables -------- //
let list;
let clientNumber;
let filteredList;

let buttonSpecialist = document.querySelectorAll(".button--specialist");
let specialistInfo = document.querySelector(".specialist__info");
let filteredBySpecialist = document.querySelector(".filtered-by-specialist");


checkForLocalStorage();


// -------- check if there is a client list in localStorage -------- //
function checkForLocalStorage() {
  if (localStorage.list) {
    list = JSON.parse(localStorage.getItem('list'));
    clientNumber = (list[list.length - 1].number) + 1;
  }
  console.log(list);
};


// -------- change client status to "done" -------- //
for (let i = 0; i < buttonSpecialist.length; i++)(function(i) {
  buttonSpecialist[i].onclick = function() {
    specialistInfo.innerHTML = "";
    buttonSpecialist.forEach(function(element) {
      element.classList.remove("button--active");
    });

    this.classList.add("button--active");
    clearOtherSpecialists();

    if (localStorage.list) {
      filteredList = list.filter(clients => clients.specialistAssigned == buttonSpecialist[i].name);
      filteredList = filteredList.filter(clients => clients.status != "done");
      renderHTML(filteredList);
      specialistInfo.classList.add("hidden");

      if (filteredBySpecialist.innerHTML.length == 0) {
        specialistInfo.classList.remove("hidden");
        specialistInfo.innerHTML = "Klientų eilėje nėra.";
      }
    } else {
      specialistInfo.classList.remove("hidden");
      specialistInfo.innerHTML = "Klientų eilėje nėra.";
    }
  }
})(i);


// -------- display client list -------- //
function renderHTML(stuff) {
  for (let k = 0; k < stuff.length; k++) {
    let ul = document.createElement("ul");
    let li = document.createElement("li");
    let button = document.createElement("button");
    ul.classList.add("filtered-by-specialist__item");
    li.classList.add("filtered-by-specialist__number");
    button.classList.add("button");
    button.classList.add("button--filtered-by-specialist");

    filteredBySpecialist.appendChild(ul);
    li.innerHTML = stuff[k].number;
    ul.appendChild(li);
    ul.appendChild(button);

    button.addEventListener("click", function() {
      statusDone(stuff[k]);
      this.parentNode.remove(this);

      if (filteredBySpecialist.innerHTML.length === 0) {
        specialistInfo.innerHTML = "Klientų eilėje nėra.";
        specialistInfo.classList.remove("hidden");
      }
    });
  }
};


// -------- clear client lists -------- //
function clearOtherSpecialists() {
  filteredBySpecialist.innerHTML = '';
};


// -------- update client list from localStorage -------- //
function getList() {
    list = JSON.parse(localStorage.getItem('list'));
    clientNumber = (list[list.length - 1].number) + 1;
};


// -------- set status "done" -------- //
function statusDone(that) {
  that.status = "done";
  localStorage.setItem('list', JSON.stringify(list));
};
