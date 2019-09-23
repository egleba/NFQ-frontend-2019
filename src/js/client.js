// -------- variables -------- //
let list;
let clientNumber;
let clientNumberInput = document.querySelector(".client__number");
let clientTime = document.querySelector(".client__time");
let clientText = document.querySelector(".client__text");
let clientInfo = document.querySelector(".client__info");
let times = [];
let avg;
let listWaiting;
let value;
let index;
let thisAvg;


checkForLocalStorage();


// -------- check if there is a client list in localStorage -------- //
function checkForLocalStorage() {
  if (localStorage.list) {
    list = JSON.parse(localStorage.getItem('list'));
    clientNumber = (list[list.length - 1].number) + 1;
    filterWaiting();
    timeToWait();
    makeSelection();
  }
  checkIfCLientListEmpty();
};


// -------- filter clients with status "waiting" -------- //
function filterWaiting() {
  if (localStorage.list) {
    listWaiting = list.filter(clients => clients.status == "waiting");
  }
};


// -------- count average time previous clents have been served -------- //
function timeToWait() {
  let timesList = list.filter(times => times.status == "done");
  for (let i = 0; i < timesList.length; i++) {
    times.push(timesList[i].timeServiced);
  }
  if (times.length > 0) {
    let sum = times.reduce((previous, current) => current += previous);
    avg = sum / times.length;
    return avg;
  }
};


// -------- make waiting clients selection options -------- //
function makeSelection() {
  if (listWaiting && listWaiting.length > 0) {
    let optionList = clientNumberInput.options;

    listWaiting.forEach(function(option) {
      optionList.add(
        new Option(option.number)
      );
    });
    value = clientNumberInput.value
    index = clientNumberInput.selectedIndex + 1;
    thisAvg = avg;

    if (avg > 0) {
      clientText.classList.remove("hidden");
      secMinVal(thisAvg);
    } else {
      clientText.innerHTML = "Aptarnautų klientų dar nebuvo, negalime numatyti, kiek laiko liko laukti."
      clientText.classList.remove("hidden");
    }
    checkIfCLientListEmpty();
  }
};


// -------- listen for selection changes -------- //
clientNumberInput.onchange = changeListener;

function changeListener() {
  value = this.value
  index = this.selectedIndex + 1;
  if (avg > 0) {
    clientText.classList.remove("hidden");
    secMinVal(thisAvg);
  }
};


// -------- check if waiting clients' list is empty -------- //
function checkIfCLientListEmpty() {
  if (clientNumberInput.innerHTML == 0) {
    clientInfo.innerHTML = "Laukiančių lankytojų nėra.";
  }
};


// -------- decide whether to display sec, min or hours -------- //
function secMinVal(thisAvg) {
  if (thisAvg <= 60) {
    clientTime.innerHTML = ": " + Math.round(thisAvg) * index + " sec.";
  } else if (thisAvg > 60 && thisAvg <= 3600) {
    clientTime.innerHTML = ": " + Math.round(thisAvg / 60) * index + " min.";
  } else {
    clientTime.innerHTML = ": " + Math.round(thisAvg / 3600) * index + " val.";
  }
};
