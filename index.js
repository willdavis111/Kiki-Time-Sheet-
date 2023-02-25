let startTime = document.getElementById('start');
let endTime = document.getElementById('stop');
const btn1 = document.getElementById('timeButton');
const out1 = document.getElementById('output');
var startparts, endparts, startDate, endDate;
let hourSlot, minuteSlot, timeDelta, timeObj, delta, runTot, fillTotal
let totHour = 0, totMin = 0

// This function finds the delta between two times provided by user
function findDelta() {
    startparts = String(startTime.value).split(':');
    endparts = String(endTime.value).split(":");
    let startHour = Number(startparts[0]), endHour = Number(endparts[0]);
    startHour = militaryTime(startHour, "stPM");
    endHour = militaryTime(endHour, "spPM");
    startHour = zeroAdd(startHour);
    endHour = zeroAdd(endHour);
    startDate = `2023-02-22 ${startHour}:${startparts[1]}:00`;
    endDate = `2023-02-22 ${endHour}:${endparts[1]}:00`;
    delta = Math.abs( new Date(startDate) - new Date(endDate));
    milisecToHour(delta);
}

// conversts hours to 24 hour time 
function militaryTime(ogHour, elementID) {
    if (document.getElementById(elementID).checked && ogHour < 12) {
        ogHour += 12;
    }
    return ogHour
}

// ensures "0" are in fron of the right values
function zeroAdd(timePiece) {
    if (String(timePiece).length < 2) {
        timePiece = '0' + String(timePiece);
    }
    return timePiece
}

// Converts millisec to hours and minutes providing a string "8:30"
function milisecToHour(delta) {
    hourSlot = Math.floor((Number(delta) / 1000 / 60 / 60) % 24);
    minuteSlot = Math.floor((Number(delta) / 1000 / 60) % 60);
    timeDelta = `${String(hourSlot)}:${String(minuteSlot)}`
}

//rounds the time spent on task based on dropdown perameter
function rounding() {
    
}

// creates an object for the work table
function makeObj() {
    timeObj = {company: document.getElementById('client').value,
        start: document.getElementById('start').value,
        end: document.getElementById('stop').value,
        timeDiff: String(timeDelta)}
}

// this adds a running total of time worked to the table
function runningTotal() {
    totHour += hourSlot;
    totMin += minuteSlot;
    if (Number(totMin) > 61) {
        totHour += 1;
        totMin -= 60;
    }
    runTot = `${String(totHour)}:${String(totMin)}`;
    fillTotal = document.getElementById("tabTotal");
    fillTotal.innerHTML = String(runTot)
}

// this function fills in a table with created objects
function fillTable(item) {
    const table = document.getElementById("tableBody");
    let row = table.insertRow();
    let company = row.insertCell(0);
    company.innerHTML = item.company;
    let start = row.insertCell(1);
    start.innerHTML = item.start;
    let end = row.insertCell(2);
    end.innerHTML = item.end;
    let diff = row.insertCell(3);
    diff.innerHTML = item.timeDiff;
}

// clears fields after information is logged
function clearField() {
    document.getElementById('client').value="";
    document.getElementById('start').value="";
    document.getElementById('stop').value="";
    document.getElementById('stAM').checked=false;
    document.getElementById('stPM').checked=false;
    document.getElementById('spAM').checked=false;
    document.getElementById('spPM').checked=false;
}

// function called when a time is submitted and fills the log 
function logTime() {
    findDelta();
    makeObj();
    fillTable(timeObj);
    runningTotal();
    clearField();
}

btn1.addEventListener('click', logTime);