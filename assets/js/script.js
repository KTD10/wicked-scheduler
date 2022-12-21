function getTime() {
  let today = moment();

  $("#currentDay").text(today.format("dddd, MMMM Do YYYY, h:mm.ss"));

  let now = moment().format("kk");
  for (let i = 0; i < eventElementArray.length; i++) {
    eventElementArray[i].removeClass("future past present");

    if (now > eventElementArray[i].data("hour")) {
      eventElementArray[i].addClass("past");
    } else if (now === eventElementArray[i].attr("data-hour")) {
      eventElementArray[i].addClass("present");
    } else {
      eventElementArray[i].addClass("future");
    }
  }
}

let saveBtn = $(".save-icon");
let containerElement = $(".container");
let event9am = $("#9AM");
let event10am = $("#10AM");
let event11am = $("#11AM");
let event12pm = $("#12PM");
let event1pm = $("#1PM");
let event2pm = $("#2PM");
let event3pm = $("#3PM");
let event4pm = $("#4PM");
let event5pm = $("#5PM");

let eventElementArray = [
  event9am,
  event10am,
  event11am,
  event12pm,
  event1pm,
  event2pm,
  event3pm,
  event4pm,
  event5pm,
];

renderLastRegistered();
getTime();
setInterval(getTime, 1000);

function renderLastRegistered() {
  for (let el of eventElementArray) {
    el.val(localStorage.getItem("time block " + el.data("hour")));
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  let btnClicked = $(event.currentTarget);

  let targetText = btnClicked.siblings("textarea");

  let targetTimeBlock = targetText.data("hour");

  localStorage.setItem("time block " + targetTimeBlock, targetText.val());
}

saveBtn.on("click", handleFormSubmit);
