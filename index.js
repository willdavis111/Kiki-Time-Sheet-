let cli1 = document.getElementById('client').value;
let startTime = document.getElementById('start').value;
let endTime = document.getElementById('stop').value;
const btn1 = document.getElementById('timeButton');
const out1 = document.getElementById('output');
let delta = 0;
var startparts, endparts, startDate, endDate;
let hourSlot, minuteSlot, timeDiff
var logArray = []

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

// creates an object for the work table
function logItem(compName, startTime, endTime, timeDiff) {
    this.company = compName;
    this.start = startTime;
    this.end = endTime;
    this.diff = timeDiff;
}


function addToLogArray(newObj) {
    logArray.push(newObj)
}


// const testItem1 = [
//     { company: "test1", start: "8:30", end: "12:30", diff: "4:00"},
//     { company: "test2", start: "12:30", end: "2:30", diff: "2:00"},
//     { company: "test3", start: "2:30", end: "4:00", diff: "1:30"}
// ];

// // this function takes generated information and fills in a table 
// function fillTable(testItem) {
//     const table = document.getElementById("tableBody");
//     testItem.forEach( item => {
//         let row = table.insertRow();
//         let company = row.insertCell(0);
//         company.innerHTML = item.company;
//         let start = row.insertCell(1);
//         start.innerHTML = item.start;
//         let end = row.insertCell(2);
//         end.innerHTML = item.end;
//         let diff = row.insertCell(3);
//         diff.innerHTML = item.diff;
//     })
// }

// this function takes generated information and fills in a table 
function fillTable(testItem) {
    const table = document.getElementById("tableBody");
    testItem.forEach( item => {
        let row = table.insertRow();
        let company = row.insertCell(0);
        company.innerHTML = item.company;
        let start = row.insertCell(1);
        start.innerHTML = item.start;
        let end = row.insertCell(2);
        end.innerHTML = item.end;
        let diff = row.insertCell(3);
        diff.innerHTML = item.diff;
    })
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
    milisecToHour(delta);
    let newObj = new logItem(cli1, startTime, endTime, timeDiff)
    console.log(newObj)
    // addToLogArray(newObj)
    // fillTable(logArray)
    // out1.innerHTML +=  `${cli1.value} | ${startTime.value} | ${endTime.value} | ${timeDiff}`;
    clearField()
}

btn1.addEventListener('click', logTime);

// fillTable(testItem1);
