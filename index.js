let startTime = document.getElementById('start');
let endTime = document.getElementById('stop');
const btn1 = document.getElementById('timeButton');
const clearButton = document.getElementById('clearTable');
var startparts, endparts, startDate, endDate;
let hourSlot, minuteSlot, timeDelta, timeObj, delta, runTot, fillTotal, hour, min, array, inDecimal;
let totHour = 0, totMin = 0
let objArray = []

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
    rounding()
    sixtyToHour(hourSlot, minuteSlot)
    hourSlot = array[0]
    minuteSlot = array[1]
    inDecimal = hourSlot + (minuteSlot/60)
    timeDelta = `${String(hourSlot)}:${String(minuteSlot)}`
}

//rounds the time spent on task based on dropdown perameter
function rounding() {
    let increment = document.getElementById('chargeBy').value
    if (increment != 0) {
        let factor = Math.round(minuteSlot / Number(increment))
        minuteSlot = factor * increment
    }
}

// creates an object for the work table
function makeObj() {
    timeObj = {company: document.getElementById('client').value,
        task: document.getElementById('task').value,
        start: document.getElementById('start').value,
        end: document.getElementById('stop').value,
        timeDecimal: inDecimal,
        timeDiff: String(timeDelta)};
    objArray.push(timeObj)
}

// this adds a running total of time worked to the table
function runningTotal() {
    totHour += hourSlot;
    totMin += minuteSlot;
    sixtyToHour(totHour, totMin);
    totHour = array[0]
    totMin = array[1]
    runTot = `${String(totHour)}:${String(totMin)}`;
    fillTotal = document.getElementById("tabTotal");
    fillTotal.innerText = String(runTot);
}

// adds an hour when minutes reaches 61 
function sixtyToHour(hour, min) {
    if (Number(min) >= 60) {
        hour += 1;
        min -= 60;
    }
    array = [hour, min]
    return array
}

// this function fills in a table with created objects
function fillTable(item) {
    const table = document.getElementById("tableBody");
    let row = table.insertRow();
    let company = row.insertCell(0);
    company.innerText = item.company;
    let task = row.insertCell(1);
    task.innerText = item.task;
    let start = row.insertCell(2);
    start.innerText = item.start;
    let end = row.insertCell(3);
    end.innerText = item.end;
    let diff = row.insertCell(4);
    diff.innerText = item.timeDiff;
}

// clears fields after information is logged
function clearField() {
    document.getElementById('client').value="";
    document.getElementById('task').value="";
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

// clears table
function clearTable(){
    document.getElementById('tableBody').innerText="";
    fillTotal.innerText = '';
    runTot = '', totHour = 0, totMin = 0;
    clearGraph()
}

btn1.addEventListener('click', logTime);
clearButton.addEventListener('click', clearTable);


/// all functions for creating graphs 

let graphb1 = document.getElementById('graphButton');
let graphClear = document.getElementById('clearGraph');
let cliList = [], cliTime = [], taskList = [], taskTime=[];

//creates required lists of labels and data for charts.js
function chartLists() {
    listsForCharts(objArray, cliList, cliTime, 'company');
    listsForCharts(objArray, taskList, taskTime, 'task');
}

// totals time for indivual task or client
function listsForCharts(array1, list1, list2, key) {
    for (i in array1) {
        let obj = array1[i]
        if (list1.includes(obj[key])) {
            let spot = list1.indexOf(obj[key])
            list2[spot] += array1[1].timeDecimal
        } else {
            list1.push(obj[key])
            list2.push(array1[i].timeDecimal)
        }
    }
}

// declared chart variables 
let ctx = document.getElementById('myChart');
const piect = document.getElementById('nextChart');
let barChart, pieChart

// makes charts
function makeBarChart() {
    Chart.defaults.font.size = 25;
    Chart.defaults.font.color = 'white';
    barChart = new Chart(ctx, {type: 'bar', data: {labels: cliList,datasets: [{label: "Hours Per Client",data: cliTime,borderWidth: 1}]}, options: { plugins: {legend: {labels: {font: {size: 30}}}}, responsive: true, scales: {y: {title: {display: true,text: 'Hours'}, beginAtZero: true,} ,x: {title: {display: true,text: 'Clients'}}}}});
    pieChart = new Chart(piect, {type: 'pie', data: {labels: taskList, datasets: [{label: "Time Per Task", data: taskTime, borderWidth: 1}]}, options: {responsive: true, maintainAspectRatio: false, plugins: {legend: {labels: {font: {size: 30}}}}}});
}

// creates graph from leger objects
function makeGraphs() {
    chartLists();
    makeBarChart();
}

// button listeners
graphb1.addEventListener('click', makeGraphs);
graphClear.addEventListener('click', clearGraph);


// deletes graphs from browser 
function clearGraph() {
    barChart.destroy();
    pieChart.destroy();
    cliList = [], cliTime = [], taskList = [], objArray = [], taskTime=[];
}