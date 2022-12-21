// updates time on the webpage
function updateTime() {
    let today = moment();

    // updates the time element in the header
    $("#currentDay").text(today.format("dddd, MMMM Do YYYY, h:mm.ss"));

    // For coloring the past, present, and future time blocks
    let now = moment().format("kk");
    for (let i = 0; i < scheduleElementArray.length; i++) {
        scheduleElementArray[i].removeClass("future past present");

        if (now > scheduleElementArray[i].data("hour")) {
            scheduleElementArray[i].addClass("past");

        } else if (now === scheduleElementArray[i].attr("data-hour")) {
            scheduleElementArray[i].addClass("present");

        } else {

            scheduleElementArray[i].addClass("future");
        }
    }
}

// textarea elements
let saveBtn = $(".save-icon");
let containerElement = $(".container");
let schedule9am = $("#9AM");
let schedule10am = $("#10AM");
let schedule11am = $("#11AM");
let schedule12pm = $("#12PM");
let schedule1pm = $("#1PM");
let schedule2pm = $("#2PM");
let schedule3pm = $("#3PM");
let schedule4pm = $("#4PM");
let schedule5pm = $("#5PM");

let scheduleElementArray = [
    schedule9am,
    schedule10am,
    schedule11am,
    schedule12pm,
    schedule1pm,
    schedule2pm,
    schedule3pm,
    schedule4pm,
    schedule5pm,
];

renderLastRegistered();
updateTime();
setInterval(updateTime, 1000); 

// render schedule saved in local storage
function renderLastRegistered() {
    for (let el of scheduleElementArray) {
        el.val(localStorage.getItem("time block " + el.data("hour")));

    }
}


// function for handling clicks
function handleFormSubmit(event) {
    event.preventDefault();

    let btnClicked = $(event.currentTarget);

    let targetText = btnClicked.siblings("textarea");
 
    let targetTimeBlock = targetText.data("hour");

    localStorage.setItem("time block " +  targetTimeBlock, targetText.val());
}

saveBtn.on("click", handleFormSubmit);