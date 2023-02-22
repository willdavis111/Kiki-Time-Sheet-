let cli1 = document.getElementById('client');
let startTime = document.getElementById('start');
let endTime = document.getElementById('stop');
const btn1 = document.getElementById('timeButton');
const out1 = document.getElementById('output');
let delta = 0;
var startparts, endparts, startDate, endDate;
let hourSlot, minuteSlot, timeDiff

// This function finds the delta between two times provided by user
function findDelta() {
    startparts = String(startTime.value).split(':');
    endparts = String(endTime.value).split(":");
    let startHour = Number(startparts[0]), endHour = Number(endparts[0]);
    if (document.getElementById('stPM').checked && startHour < 12) {
        startHour += 12;
    }
    if (document.getElementById('spPM').checked && endHour < 12) {
        endHour += 12;
    }
    if (String(startHour).length < 2) {
        startHour = '0' + String(startHour);
    }
    if (String(endHour).length < 2) {
        endHour = '0' + String(endHour);
    }
    startDate = `2023-02-22 ${startHour}:${startparts[1]}:00`;
    endDate = `2023-02-22 ${endHour}:${endparts[1]}:00`;
    delta = Math.abs( new Date(startDate) - new Date(endDate));
    return delta
}

// Converts millisec to hours and minutes providing a string "8:30"
function milisecToHour() {
    hourSlot = Math.floor((Number(delta) / 1000 / 60 / 60) % 24);
    minuteSlot = Math.floor((Number(delta) / 1000 / 60) % 60);
    timeDiff = `${String(hourSlot)}:${String(minuteSlot)}`
}

// function called when a time is submitted and fills the log 
function logTime() {
    findDelta();
    milisecToHour(delta);
    out1.innerHTML +=  `${cli1.value} | ${startTime.value} | ${endTime.value} | ${timeDiff}`;
}

btn1.addEventListener('click', logTime);

