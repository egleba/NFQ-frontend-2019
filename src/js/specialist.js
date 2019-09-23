// -------- variables -------- //
let list;
let clientNumber;
let filteredList;

let buttonSpecialist = document.querySelectorAll(".button--specialist");
let specialistInfo = document.querySelector(".specialist__info");
let filteredBySpecialist = document.querySelector(".filtered-by-specialist");

let doneButtons = [];

checkForLocalStorage();


// -------- check if there is a client list in localStorage -------- //
function checkForLocalStorage() {
  if (localStorage.list) {
    list = JSON.parse(localStorage.getItem('list'));
    clientNumber = (list[list.length - 1].number) + 1;
  }
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
        specialistInfo.innerHTML = "Lankytojų eilėje nėra.";
      }
    } else {
      specialistInfo.classList.remove("hidden");
      specialistInfo.innerHTML = "Lankytojų eilėje nėra.";
    }
  }
})(i);


// -------- display client list -------- //
function renderHTML(stuff) {
  doneButtons = [];
  for (let k = 0; k < stuff.length; k++) {
    let ul = document.createElement("ul");
    let li = document.createElement("li");
    let button = document.createElement("button");
    ul.classList.add("filtered-by-specialist__item");
    li.classList.add("filtered-by-specialist__number");
    button.classList.add("button");
    button.classList.add("button--filtered-by-specialist");
    button.classList.add("hidden");

    filteredBySpecialist.appendChild(ul);
    li.innerHTML = stuff[k].number;
    ul.appendChild(li);
    ul.appendChild(button);
    doneButtons.push(button);

    for (let j = 0; j < doneButtons.length; j++) {
      doneButtons[0].classList.remove("hidden");
    }


    button.addEventListener("click", function() {
      statusDone(stuff[k]);
      if (stuff[k + 1]) {
        statusServiced(stuff[k + 1]);
        let startTime = new Date();
        stuff[k + 1].timeServiced = startTime;
        localStorage.setItem('list', JSON.stringify(list));
      }

      this.parentNode.remove(this);
      doneButtons.shift(doneButtons[0]);
      if (doneButtons.length > 0) {
        doneButtons[0].classList.remove("hidden");
      }

      if (filteredBySpecialist.innerHTML.length === 0) {
        specialistInfo.innerHTML = "Lankytojų eilėje nėra.";
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
  if (that.timeServiced != 0) {
    let startTime = Date.parse(that.timeServiced);
    let endTime = new Date();

    let timeDiff = endTime - startTime;
    timeDiff /= 1000;

    let seconds = Math.round(timeDiff);
    that.timeServiced = seconds;
  }
  localStorage.setItem('list', JSON.stringify(list));
};


// -------- set status "serviced" -------- //
function statusServiced(that) {
  that.status = "serviced";
};
