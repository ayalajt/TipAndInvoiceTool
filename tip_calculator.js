const addWorkerPopup = document.getElementById("worker-popup")
const buttonAddWorker = document.getElementById("add-worker-button");
const buttonCancelWorker = document.getElementById("cancel-worker-button");
const buttonCalculateResults = document.getElementById("calculate-button")
const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");
const inputDate = document.getElementById("date");
const buttonRestartTable = document.getElementById("restart-button");
const buttonSavePDF = document.getElementById("save-button");
const buttonClearAll = document.getElementById("clear-all-button");
const inputManager = document.getElementById("manager");
const inputCash = document.getElementById("cash-tips");
const inputFoodSales = document.getElementById("food-sales");
const inputWorkerName = document.getElementById("name");
const inputWorkerStartTime = document.getElementById("start-time");
const inputWorkerEndTime = document.getElementById("end-time");
const inputWorkerTips = document.getElementById("tips");
const buttonTodayDate = document.getElementById("today-date-button");
const alertMessage = document.getElementById("alert-msg");
const buttonSelectManager = document.getElementById("select-manager-button");
const dropdownManagerOptions = document.getElementById("manager-options");
const buttonSelectWorker = document.getElementById("select-worker-button");
const dropdownWorkerOptions = document.getElementById("worker-options");
const buttonSelectShift = document.getElementById("select-shift-button");
const dropdownShiftOptions = document.getElementById("shift-options");
const dropdownSelectTime = document.getElementById("time-dropdown-input");
const dropdownTimeOptions = document.getElementById("time-dropdown-options");
const timeSelected = document.getElementById("current-time");
const dropdownSelectPosition = document.getElementById("position-dropdown-input");
const dropdownSelectPositionOptions = document.getElementById("position-dropdown-options");
const positionSelected = document.getElementById("current-position");
const workerTable = document.getElementById("worker-table");
const workerTableBody = document.getElementById("worker-tbody");
const workerTableResults = document.getElementById("worker-table-results");
const workerTableResultsBody = document.getElementById("results-tbody");
const tableHeader = document.getElementById("table-header");
const inputRowTime = document.getElementById("input-row-time");
const inputRowTips = document.getElementById("input-row-tips");
const alertMessageX = document.getElementById("close-alert");
const buttonUploadJSON = document.getElementById("upload-button");
const buttonReEditTable = document.getElementById("reedit-button");
const buttonLate = document.getElementById("late-button");
const buttonLoginCalc = document.getElementById("calc-login-button");
const buttonOpenMenu = document.getElementById("open-menu");
const menuPages = document.getElementById("page-menus")
const menuTipOption = document.getElementById("option-tip-calculator");
const menuInvoiceOption = document.getElementById("option-invoices");
const inputPassword = document.getElementById("calc-password");
const inputUsername = document.getElementById("calc-username");
const pageInvoice = document.getElementById("invoice_tool");
const pageTipCalculator = document.getElementById("tip_calculator");
const pageTotalCalculator = document.getElementById("total_calculator");
const pageCashReports = document.getElementById("cash_reports");
const buttonsNavBar = document.getElementById("nav-buttons");
const titleNavBar = document.getElementById("nav-title");

addWorkerPopup.addEventListener("click", checkClosingWorkerPopup);
buttonCancelWorker.addEventListener("click", closePopup);
buttonAddWorker.addEventListener("click", addWorker);
buttonCalculateResults.addEventListener("click", calculateTips);
leftArrow.addEventListener("click", goToWorkerTable);
rightArrow.addEventListener("click", goToResultsTable);
inputDate.addEventListener("keydown", checkBackspace);
inputDate.addEventListener("input", addHyphen);
buttonRestartTable.addEventListener("click", restartCalculator);
buttonSavePDF.addEventListener("click", printResults);
buttonClearAll.addEventListener("click", restartCalculator);
inputManager.addEventListener("click", changeInput);
inputDate.addEventListener("click", changeInput);
inputCash.addEventListener("click", changeInput);
inputFoodSales.addEventListener("click", changeInput);
inputWorkerName.addEventListener("click", changeInput);
inputWorkerStartTime.addEventListener("click", changeInput);
inputWorkerEndTime.addEventListener("click", changeInput);
inputWorkerTips.addEventListener("click", changeInput);
inputManager.addEventListener("input", inputEdited);
inputDate.addEventListener("input", inputEdited);
inputCash.addEventListener("input", inputEdited);
inputFoodSales.addEventListener("input", inputEdited);
inputWorkerName.addEventListener("input", inputEdited);
inputWorkerStartTime.addEventListener("input", inputEdited);
inputWorkerEndTime.addEventListener("input", inputEdited);
inputWorkerTips.addEventListener("input", inputEdited);
buttonTodayDate.addEventListener("click", setTodaysDate);
buttonSelectManager.addEventListener("click", toggleManagerOptions);
buttonSelectWorker.addEventListener("click", toggleWorkerOptions);
dropdownSelectTime.addEventListener("click", toggleTimeOptions);
dropdownSelectPosition.addEventListener("click", toggleWorkerPositionsOptions);
buttonSelectShift.addEventListener("click", toggleShiftOptions);
document.addEventListener("click", closeOptions)
document.addEventListener("keyup", handleKeyUp);
document.addEventListener("keydown", handleKeyDown);
alertMessageX.addEventListener("click", closeAlert)
buttonUploadJSON.addEventListener("change", uploadJSON);
buttonReEditTable.addEventListener("click", editTable);
buttonLate.addEventListener("click", toggleLate);
buttonLoginCalc.addEventListener("click", checkCalcLogin);
buttonOpenMenu.addEventListener("click", openPageMenus);
menuTipOption.addEventListener("click", tipToolSelected);
menuInvoiceOption.addEventListener("click", invoiceToolSelected);
document.addEventListener("click", checkClosingMenu);
inputPassword.addEventListener("keydown", checkEnterPassword);
inputUsername.addEventListener("keydown", checkEnterPassword);

var numWorkers = 1;
var workerArray = [];
var cashTips = 0;
var foodSales = 0;
var tipPool = 0;
var totalPoints = 0;
var numDishwashers = 0;
var backspacePressed = false;
var workerPosition = {};
var globalJSON = {}
var retrievedJSON = {}
var keys = {}
var waitForUnpress = false;
var connectionFailed = false;
var latePressed = false;
var serverActive = true;
var apiKey = "";
var apiMasterKey = "";
var keyOne = "";
var keyTwo = "";
var loginRetrieved = false;
var cashLoginUsername = "";
var cashLoginPassword = "";
var calcLoginUsername = "";
var calcLoginPassword = "";
var loginRetrievedCalc = false;
let uploadedDates = [];
var invoiceApiKey = "";

window.jsPDF = window.jspdf.jsPDF;

/**
 * Initializes every dropdown with event listeners when an option is clicked
 */
window.onload = function () {
    getKeys();
    let timeOptions = document.querySelectorAll(".styled-dropdown-option.time");
    for (var i = 0; i < timeOptions.length; i++) {
        timeOptions[i].addEventListener("click", selectTime);
    }

    let positionOptions = document.querySelectorAll(".styled-dropdown-option.position");
    for (var j = 0; j < positionOptions.length; j++) {
        positionOptions[j].addEventListener("click", selectPosition);
        positionOptions[j].addEventListener("click", checkPosition);
    }

    let shiftOptions = document.querySelectorAll(".styled-dropdown-option.shift");
    for (var i = 0; i < timeOptions.length; i++) {
        shiftOptions[i].addEventListener("click", selectShift);
    }
};

/**
 * Closes the worker popup if the user clicks anywhere but the popup when it is open
 * @param {HTML DOM} element - The element where a user clicked
 */
function checkClosingWorkerPopup(element) {
    if (element.target.classList.contains("popup-bg")) { closePopup(); }
}

/**
 * Checks to see if enter is pressed when a user is typing a password
 * @param {HTML DOM} element - the input field with information about key presses
 */
function checkEnterPassword(element) {
    if (element.code == "Enter") { checkCalcLogin(); }  
}

/**
 * Changes the main view to the Tip Calculator after it is clicked in the side menu
 */
function tipToolSelected() {
    menuInvoiceOption.classList.remove("active");
    menuTipOption.classList.add("active");
    pageInvoice.style.display = "none";
    openTabTip();
    buttonsNavBar.style.display = "flex";
    titleNavBar.innerText = "Lolita's Tip Tool";
}

/**
 * Changes the main view to the Invoice Tool after it is clicked in the side menu
 */
function invoiceToolSelected() {
    menuTipOption.classList.remove("active");
    menuInvoiceOption.classList.add("active");
    pageTipCalculator.style.display = "none";
    pageTotalCalculator.style.display = "none";
    pageCashReports.style.display = "none";
    pageInvoice.style.display = "flex";
    buttonsNavBar.style.display = "none";
    titleNavBar.innerText = "Lolita's Invoice Tool";
    if (invoice_JSONRetrieved == false) { 
        resetInvoiceTable();
        resetTotalTable();
        if (invoice_serverActive) { invoice_getJSON(); }
        invoice_JSONRetrieved = true;
    }
}

/**
 * Closes the side menu if it is open and the user clicks anywhere but the side menu
 * @param {HTML DOM} element - the object that is clicked
 */
function checkClosingMenu(element) {
    if (element.target.id != "page-menus"
    && element.target.id != "close-menu-icon"
    && menuPages.classList.contains("active")) {
        menuPages.classList.remove("active");
        buttonOpenMenu.classList.remove("active");
    }
}

/**
 * Toggles the side menu to be opened or closed, depending on its state
 */
function openPageMenus() {
    if (buttonOpenMenu.classList.contains("active")) {
        buttonOpenMenu.classList.remove("active");
        menuPages.classList.remove("active");
    }
    else {
        buttonOpenMenu.classList.add("active");
        menuPages.classList.add("active");
    }
}

/**
 * Checks the username and password a user enters to allow access to the tools
 */
function checkCalcLogin() {
    if (loginRetrievedCalc) {
        let user = document.getElementById("calc-username").value;
        let password = document.getElementById("calc-password").value;
        if (user == calcLoginUsername && password == calcLoginPassword) {
            document.getElementById("nav-bar").style.display = "flex";
            pageTipCalculator.style.display = "flex";
            document.getElementById("login-popup-calculator").style.display = "none";
            loginSuccessful = true;
            getJSON();
        }
        else { printAlert("Incorrect login!"); }
    }
}

/**
 * Retrieves a config file that contains api keys and login information
 * @returns true or false, depending on if config.json exists
 */
function getKeys() {
    let filePath = "./config.json"
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
        let resultJSON = JSON.parse(xmlhttp.responseText);
        apiKey = resultJSON.apiKey
        apiMasterKey = resultJSON.apiMasterKey
        keyOne = resultJSON.secretKeyOne;
        keyTwo = resultJSON.secretKeyTwo;
        apiCashKey = resultJSON.apiCashKey;
        let loginDetails = resultJSON.cashReportsLogin;
        cashLoginUsername = loginDetails.user;
        cashLoginPassword = loginDetails.password;
        let loginDetailsCalc = resultJSON.calculatorLogin;
        calcLoginUsername = loginDetailsCalc.user;
        calcLoginPassword = loginDetailsCalc.password;
        invoiceApiKey = resultJSON.invoiceApiKey;
        loginRetrievedCalc = true;
        loginRetrieved = true;
        return true;
    }
    else if (xmlhttp.status == 404) {
        printAlert("ERROR: For privacy sake, API keys and other sensitive information are not uploaded to Github, so nothing inputted here will be uploaded to the server")
        return false;
    }
}

/**
 * Changes the styling of the late icon in the worker popup when it is clicked
 */
function toggleLate() {
    if (latePressed == false) {
        latePressed = true;
        buttonLate.style.backgroundColor = "black";
        document.getElementById("late-icon").style.filter = "brightness(0) invert(1)";
    }
    else if (latePressed == true) {
        latePressed = false;
        buttonLate.style.backgroundColor = null;
        document.getElementById("late-icon").style.filter = null;
    }
}

/**
 * Sets the late icon in the popup back to its default values
 */
function resetLateButton() {
    latePressed = false;
    buttonLate.style.backgroundColor = null;
    document.getElementById("late-icon").style.filter = null;
}

/**
 * Uploads a json file to the global json
 * @param {HTML DOM} element - an HTML object, used to see the files of that object
 * @returns if there are no files selected, alert and do nothing
 */
function uploadJSON(element) {
    let files = element.target.files;
    if (!files.length) { return; }

    Object.keys(files).forEach(i => {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
            let pdfResult = reader.result;
            pdfResult = pdfResult.split("\n");

            /* Parse through the pdf text, extracting any text with ( ), as those are text lines */
            let elems = []
            for (var i = 0; i < pdfResult.length; i++) {
                if (pdfResult[i].match((/\(.*\)/))) {
                    let result = pdfResult[i].match((/\(.*\)/));
                    elems.push(result[0]);
                }
            }

            /* Trim out excess info and store in a new array */
            let actualInfo = []
            for (var j = 0; j < elems.length; j++) {
                let string = elems[j].replace("(", "").replace(")", "");
                string = string.trim();
                if (string != "" && (!(string.includes("jsPDF"))) && (!(string.includes("D:")))) {
                    actualInfo.push(string);
                }
            }
            let workerIndex = 0;
            let workerTableFound = false;
            while (workerTableFound == false) {
                if (actualInfo[workerIndex] == "Worker Table") {
                    /* Skip headers */
                    workerIndex += 5;
                    workerTableFound = true;
                }
                else { workerIndex++; }
            }

            let workers = [];
            while (actualInfo[workerIndex] != "Results Table") {
                let workerInfo = {}
                let workerName = actualInfo[workerIndex];
                workerIndex += 1;
                let workerPos = actualInfo[workerIndex];
                workerIndex += 1;
                let workerHrs = actualInfo[workerIndex];
                workerIndex += 1;
                let workerTips = actualInfo[workerIndex];
                workerIndex += 1;
                if (workerPos == "Dishwasher") {
                    workerHrs = null;
                    workerTips = null;
                }
                else {
                    workerHrs = parseFloat(workerHrs);
                    workerTips = Math.round(parseFloat(workerTips));
                }
                workerInfo = { name: workerName, position: workerPos, hours: workerHrs, tips: workerTips, wage: 0.00, points: -1, late: false };
                workers.push(workerInfo);
            }

            /* At the Results Table, skip the headers */
            workerIndex += 5;
            while (workerIndex < actualInfo.length) {
                let resultsName = actualInfo[workerIndex];
                for (var i = 0; i < workers.length; i++) {
                    if (workers[i].name == resultsName) {
                        workerIndex += 1;
                        let position = actualInfo[workerIndex];
                        let resultsWage = 0;
                        let resultsPoints = 0;
                        workerIndex += 1;
                        resultsWage = parseFloat(actualInfo[workerIndex]);
                        workerIndex += 1;
                        if (position == "Dishwasher") { resultsPoints = "-"; }
                        else { resultsPoints = parseFloat(actualInfo[workerIndex]); }
                        workers[i].wage = resultsWage;
                        workers[i].points = resultsPoints;
                        workerIndex += 1;
                    }
                }
            }

            let date = "";
            let manager = "";
            let foodAndCash = "";
            for (var i = 0; i < actualInfo.length; i++) {
                if (actualInfo[i].includes("Tip Report")) { date = actualInfo[i]; }
                if (actualInfo[i].includes("Closing Manager")) { manager = actualInfo[i]; }
                if (actualInfo[i].includes("Food Sales")) { foodAndCash = actualInfo[i]; }
            }

            manager = manager.split(": ");
            manager = manager[1];
            foodAndCash = foodAndCash.split(", ");
            let resultFood = foodAndCash[0];
            let resultCash = foodAndCash[1];
            resultFood = resultFood.split(": $");
            resultFood = resultFood[1];
            resultCash = resultCash.split(": $");
            resultCash = resultCash[1];
            const managerInfo = { name: manager, position: "Manager", foodsales: parseFloat(resultFood), cashtips: parseFloat(resultCash) };
            workers.push(managerInfo);
            date = dateToKey(date);
            globalJSON[date] = workers;
            let justDate = date.split("_");
            justDate = justDate[0];
            uploadedDates.push(justDate);
            updateJSON();
        }
        reader.readAsBinaryString(file);
    });
}

/**
 * Converts a date to a JSON key
 * @param {String} date - The date in the format "Month Day, Year (Lunch|Dinner)"
 * @returns the JSON key
 */
function dateToKey(date) {
    let dateArray = date.split(" ");
    let month = dateArray[0];
    let day = dateArray[1];
    let year = dateArray[2];
    let time = dateArray[4];
    if (month == "January") { month = "01"; }
    else if (month == "February") { month = "02"; }
    else if (month == "March") { month = "03"; }
    else if (month == "April") { month = "04"; }
    else if (month == "May") { month = "05"; }
    else if (month == "June") { month = "06"; }
    else if (month == "July") { month = "07"; }
    else if (month == "August") { month = "08"; }
    else if (month == "September") { month = "09"; }
    else if (month == "October") { month = "10"; }
    else if (month == "November") { month = "11"; }
    else if (month == "December") { month = "12"; }
    day = day.replace(",", "");
    let dateString = month + "-" + day + "-" + year + "_" + time;
    return dateString;
}

/**
 * Close the alert at the bottom of window
 */
function closeAlert() {
    alertMessage.style.display = 'none';
}

/**
 * Checks to see if CTRL + F9 is pressed down, which is a shortcut to save the json as a text file
 */
function handleKeyDown(event) {
    keys[event.key] = true;
    /* this flag is so the json is not saved repeatedly, instead just once and then wait until a key is released */
    if (waitForUnpress == false) {
        if (keys[keyOne] && event.key == [keyTwo]) {
            waitForUnpress = true;
            saveJSON();
        }
    }
}

/**
 * Checks to see if a key is released, and removes it from the curren key array
 * @param {Event} event - Object that contains which key is pressed
 */
function handleKeyUp(event) {
    waitForUnpress = false;
    delete keys[event.key];
}

/**
 * Sets the shift start and end time with the option selected
 * @param {HTML DOM} element - The option chosen in the shift dropdown menu
 */
function selectShift(element) {
    let option = "";
    /* For every dropdown, check if the text of the option itself was pressed or the option container.
       Grab the corresponding option based on this. */
    if (!element.target.classList.contains("styled-dropdown-option")) {
        option = element.target.parentElement.querySelector(".shift-input").innerHTML;
    }
    else { option = element.target.querySelector(".shift-input").innerHTML; }
    option = option.split(" - ");
    let start = option[0];
    let end = option[1];
    start = start.trim();
    end = end.trim();
    start = validateTime(start)
    end = validateTime(end)

    inputWorkerStartTime.value = start;
    inputWorkerEndTime.value = end;
    inputWorkerStartTime.style.color = "black";
    inputWorkerEndTime.style.color = "black";
    buttonSelectShift.style.borderColor = null;
    dropdownShiftOptions.style.display = "none";
}

/**
 * Sets the day's time with the option selected
 * @param {HTML DOM} element - The option chosen in the time dropdown menu
 */
function selectTime(element) {
    let option = "";
    if (!element.target.classList.contains("styled-dropdown-option")) {
        option = element.target.parentElement.querySelector(".time-input").innerHTML;
    }
    else { option = element.target.querySelector(".time-input").innerHTML; }

    timeSelected.innerHTML = option;
    dropdownSelectTime.style.color = "black";
    dropdownSelectTime.style.borderColor = null;
    dropdownTimeOptions.style.display = "none";
    document.getElementById("time-dropdown-arrow").style.filter = "opacity(0.5) drop-shadow(0 0 0 rgb(180, 180, 180))";

}

/**
 * Sets the worker's position with the option selected
 * @param {HTML DOM} element - The option chosen in the position dropdown menu
 */
function selectPosition(element) {
    let option = "";
    if (!element.target.classList.contains("styled-dropdown-option")) {
        option = element.target.parentElement.querySelector(".position-input").innerHTML;
    }
    else { option = element.target.querySelector(".position-input").innerHTML; }

    positionSelected.innerHTML = option;
    positionSelected.style.color = "black";
    dropdownSelectPosition.style.color = "black";
    dropdownSelectPosition.style.borderColor = null;
    dropdownSelectPositionOptions.style.display = "none";
    document.getElementById("position-dropdown-arrow").style.filter = "opacity(0.5) drop-shadow(0 0 0 rgb(180, 180, 180))";
}

/**
 * Opens the popup that allows a user to enter a worker's shift information
 */
function openPopup() {
    addWorkerPopup.style.display = "flex";
}

/**
 * Closes the popup that allows a user to enter a worker's shift information
 */
function closePopup() {
    resetFields();
    addWorkerPopup.style.display = 'none';
}

/**
 * Verifies all of the passed worker values are valid before attempting to print them to the html
 * @param {HTML DOM} element - the form element itself is passed in order to prevent it from refreshing
 */
function addWorker(element) {
    element.preventDefault();

    let name = inputWorkerName.value;
    if (name === "") { name = "Worker " + numWorkers }
    name = name.trim();
    name = capitalizeFirstLetter(name);
    let position = positionSelected.innerHTML;
    position = position.trim();

    if (position == "Select") { alert("ERROR: Input a valid position") }
    else {
        if (position == "Dishwasher") {
            if (latePressed) { addToWorkerTable(name, position, "-", "-", true); }
            else { addToWorkerTable(name, position, "-", "-", false); }

            closePopup();
            numWorkers++;
            resetFields();
        }
        else {
            let startTime = inputWorkerStartTime.value;
            let endTime = inputWorkerEndTime.value;
            if (startTime == "" || endTime == "") { alert("ERROR: Input valid Start and End times"); }
            else {
                startTime = startTime.trim();
                endTime = endTime.trim();
                startTime = validateTime(startTime);
                endTime = validateTime(endTime);

                let startHour = startTime.split(":")[0];
                let endHour = endTime.split(":")[0];
                let timeToMidnight = 0;
                let PMtoAM = false;

                /* If the start time is in PM and the end time is in AM, it will be after midnight,
                so calculate the difference from the start time to midnight, set the start time to midnight,
                calculate the time from midnight to end time, then add these 2 values together */
                if (startHour > 12 && endHour < 12) {
                    let startTimeString = "1970-01-01T" + startTime + ":00"
                    let midnightString = "1970-01-01T24:00:00";
                    let midnightDate = new Date(midnightString)
                    let startDate = new Date(startTimeString)
                    timeToMidnight = (midnightDate - startDate) / 1000 / 60 / 60;
                    timeToMidnight = timeToMidnight.toFixed(2);
                    startTime = "00:00";
                    PMtoAM = true;
                }

                let endTimeString = "1970-01-01T" + endTime + ":00"
                let endDate = new Date(endTimeString)
                let startTimeString = "1970-01-01T" + startTime + ":00"
                let startDate = new Date(startTimeString)
                let hours = (endDate - startDate) / 1000 / 60 / 60;
                if (isNaN(hours)) { alert("ERROR: Please input valid hours. They must be in the format '00:00', including AM or PM if necessary. Examples: 05:30 PM, 01:30 AM, 03:00") }
                else {
                    if (hours < 0) { hours = hours * -1 }
                    hours = hours.toFixed(2)
                    
                    if (PMtoAM) { hours = parseFloat(hours) + parseFloat(timeToMidnight); }

                    let tips = inputWorkerTips.value;
                    if (tips === "") { tips = "0.00" }
                    tips = parseFloat(tips).toFixed(2);

                    if (latePressed) { addToWorkerTable(name, position, hours, tips, true); }
                    else { addToWorkerTable(name, position, hours, tips, false); }

                    /* Reset form fields */
                    numWorkers++;
                    resetFields();
                    closePopup();
                }
            }
        }
    }
}

/**
 * Adds a row to worker table's html
 * @param {String} name - the worker's name
 * @param {String} position - the worker's position
 * @param {Number} hours - the worker's hours
 * @param {Number} tips - the worker's tips
 * @param {Boolean} wasLate - if the worker was late or not
 */
function addToWorkerTable(name, position, hours, tips, wasLate) {
    let emptyRows = document.querySelectorAll(".empty-row");
    let lateHTML = ``;
    if (wasLate) {
        lateHTML = `
        <div class="table-icon-container">
            <img class="late-icon-table active" title="Worker was late, -1 Point" src="/icons/delay-icon-solid.svg"> 
        </div>`;
    }

    /* if the table has at least 2 empty rows, overwite one and move the add worker button to the next row */
    if (emptyRows.length >= 2) {
        emptyRows[0].innerHTML = `  
        <td class="name-cell">
            <div class="row-text">
                ${name} 
            </div>
        </td>
        <td class="position-cell">
            <div class="row-text">
                ${position} 
            </div>
        </td>
        <td class="hours-cell">
            <div class="row-text">
                ${hours} 
            </div>
            ${lateHTML}
        </td>
        <td id="tips" class="tips-cell">
            <div class="row-text tips">
                ${tips} 
            </div>
            <div class="modify-container">
                <div class="edit-row">
                    <img class="edit-pen" src="/icons/pen-solid.svg">
                </div>
                <div class="remove">
                    <img class="remove-X" src="/icons/xmark-solid.svg">
                </div>
            </div>
        </td>`
        emptyRows[0].classList.remove("empty-row")
        emptyRows[0].classList.add("worker-row");
        emptyRows[1].innerHTML = `
        <td></td>
        <td></td>
        <td></td>
        <td><div class="option"><p onclick="openPopup()">+</p></div></td>`
    }
    /* Otherwise there is only one empty row, so overwrite the empty row and create a new empty one with
       the add worker button */
    else {
        emptyRows[0].innerHTML = `  
        <td class="name-cell">
            <div class="row-text">
                ${name} 
            </div>
        </td>
        <td class="position-cell">
            <div class="row-text">
                ${position} 
            </div>
        </td>
        <td class="hours-cell">
            <div class="row-text">
                ${hours} 
            </div>
        </td>
        <td id="tips" class="tips-cell">
            <div class="row-text tips">
                ${tips} 
            </div>
            <div class="modify-container">
                <div class="edit-row">
                    <img class="edit-pen" src="/icons/pen-solid.svg">
                </div>
                <div class="remove">
                    <img class="remove-X" src="/icons/xmark-solid.svg">
                </div>
            </div>
        </td>`
        emptyRows[0].classList.remove("empty-row")
        emptyRows[0].classList.add("worker-row");
        let html = `
        <tr class="empty-row">
            <td></td>
            <td></td>
            <td></td>
            <td><div class="option"><p onclick="openPopup()">+</p></div></td>
        </tr>`;
        workerTableBody.insertAdjacentHTML("beforeend", html);
    }

    let workerRows = document.querySelectorAll(".worker-row");

    /* if the scrollbar is present, slightly move the edit/delete/add options */
    if (workerRows.length >= 8) {
        let editOptions = document.querySelectorAll(".modify-container");
        for (var i = 0; i < editOptions.length; i++) {
            editOptions[i].classList.add("offset");
        }
        let addOption = document.querySelector(".option");
        addOption.classList.add("offset");
    }

    appendEditOptionToRow();
    appendDeleteOptionToRow();
}

/**
 * For every worker row, add a delete option that only shows when the mouse hovers over that row.
 * This is done on the last row added each time.
 */
function appendDeleteOptionToRow() {
    let rows = document.querySelectorAll(".worker-row");
    let lastRowIndex = rows.length - 1;
    let showX = rows[lastRowIndex].querySelector(".remove");
    rows[lastRowIndex].addEventListener("mouseover", function () { showX.style.display = "flex"; }, false);
    rows[lastRowIndex].addEventListener("mouseleave", function () { showX.style.display = "none"; }, false);

    showX.addEventListener("mouseover", function () {
        showX.style.filter = "brightness(0.9) invert(.6) sepia(.9) hue-rotate(0deg) saturate(80)";
    });
    showX.addEventListener("mouseleave", function () {
        showX.style.filter = null;
    });

    showX.addEventListener("click", function () {
        let row = showX.closest(".worker-row")
        row.remove();
        numWorkers--;
        inputWorkerName.value = "Worker " + numWorkers;
        let numRows = workerTableBody.getElementsByTagName("tr").length;
        if (numRows < 8) {
            for (var i = numRows; i < 8; i++) {
                let html = `
            <tr class="empty-row">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>`;
                workerTableBody.insertAdjacentHTML("beforeend", html)
            }
        }
        let workerRows = document.querySelectorAll(".worker-row");

        /* if the scrollbar is not present, remove the edit/delete/add options offset*/
        if (workerRows.length < 8) {
            let editOptions = document.querySelectorAll(".modify-container.offset");
            for (var i = 0; i < editOptions.length; i++) {
                editOptions[i].classList.remove("offset");
            }
            let addOption = document.querySelector(".option");
            addOption.classList.remove("offset");
        }
    });
}

/**
 * For every worker row, add an edit option that only shows when the mouse hovers over that row.
 * This is done on the last row added each time.
 */
function appendEditOptionToRow() {
    let rows = document.querySelectorAll(".worker-row");
    let lastRowIndex = rows.length - 1;
    let showEdit = rows[lastRowIndex].querySelector(".edit-row");
    rows[lastRowIndex].addEventListener("mouseover", function () {
        showEdit.style.display = "flex";
    }, false);
    rows[lastRowIndex].addEventListener("mouseleave", function () {
        showEdit.style.display = "none";
    }, false);

    showEdit.addEventListener("mouseover", function () {
        showEdit.style.filter = "brightness(0.9) invert(.6) sepia(.9) hue-rotate(0deg) saturate(80)";
    });
    showEdit.addEventListener("mouseleave", function () {
        showEdit.style.filter = null;
    });
    showEdit.addEventListener("click", function () {
        closeAllEdits();
        let row = showEdit.closest(".worker-row");
        row.classList.add("editActive");
        row.style.border = "1px solid #000000";
        let cells = row.querySelectorAll(".row-text");
        for (var i = 0; i < cells.length; i++) {
            cells[i].contentEditable = true;
            cells[i].addEventListener("keypress", enterEdit);
        }
        let hoursCell = row.querySelector(".hours-cell");

        /* if it does not already have an late active icon */
        if (!(hoursCell.innerHTML).includes("late-icon-table active")) {

            /* if it does not have an late inactive icon already made */
            if (!(hoursCell.innerHTML).includes("late-icon-table inactive")) {
                let lateIcon = `
                <div class="table-icon-container">
                    <img class="late-icon-table inactive" title="Late?" src="/icons/delay-icon-solid.svg"> 
                </div>`;
                hoursCell.insertAdjacentHTML("beforeend", lateIcon)
                let lateIconElement = hoursCell.querySelector(".late-icon-table.inactive");
                lateIconElement.addEventListener("click", toggleLateIcon);
                lateIconElement.addEventListener("mouseover", hoverLateIcon);
            }

            /* if the late inactive icon is already made, show the inactive icon */
            else {
                hoursCell.querySelector(".late-icon-table.inactive").style.display = "flex";
            }
        }
        /* if there is an late active icon already made */
        else {
            let lateIconElement = hoursCell.querySelector(".late-icon-table.active");
            lateIconElement.addEventListener("click", toggleLateIcon);
            lateIconElement.addEventListener("mouseover", hoverLateIcon);
        }
    });
    document.addEventListener("click", closeEdit);
}

/**
 * Changes the late icon in a row, either by setting it active or inactive
 * @param {HTML DOM} element - an HTML object, the late icon itself
 */
function toggleLateIcon(element) {
    if (element.target.classList.contains("inactive")) {
        element.target.classList.remove("inactive");
        element.target.classList.add("active");
        element.target.title = "Worker was late, -1 Point"
    }
    else if (element.target.classList.contains("active")) {
        element.target.classList.remove("active");
        element.target.classList.add("inactive");
        element.target.title = "Late?"
    }
}

/**
 * Changes the cursor when the user hovers over the late icon
 * @param {HTML DOM} element - an HTML object, the late icon itself
 */
function hoverLateIcon(element) {
    element.target.style.cursor = "pointer";
}

/**
 * Closes the edit ability for a row
 * @param {*} element - an HTML object, either the cell or the row
 */
function closeEdit(element) {
    if (element.target.parentElement.parentElement) {
        let classes = element.target.parentElement.parentElement.classList;
        let editOption = element.target.parentElement.classList
        if (!(classes.contains("editActive") || editOption.contains("edit-row") || classes.contains("hours-cell"))) {
            let editRows = document.querySelectorAll(".editActive");
            for (var i = 0; i < editRows.length; i++) {
                let cells = editRows[i].querySelectorAll(".row-text");
                for (var j = 0; j < cells.length; j++) { cells[j].contentEditable = false; }
                editRows[i].style.boxShadow = null;
                editRows[i].style.border = null;
                editRows[i].classList.remove("editActive");
            }

            let lateIconsInactive = document.querySelectorAll(".late-icon-table.inactive")
            for (var i = 0; i < lateIconsInactive.length; i++) { lateIconsInactive[i].style.display = "none" }

            let lateIconsActive = document.querySelectorAll(".late-icon-table.active");
            for (var i = 0; i < lateIconsActive.length; i++) {
                lateIconsActive[i].removeEventListener("click", toggleLateIcon);
                lateIconsActive[i].removeEventListener("mouseover", hoverLateIcon);
                lateIconsActive[i].style.cursor = null;
            }
        }
    }
}

/**
 * Closes the ability to edit a row if a row is currently being edited and enter is pressed
 * @param {HTML DOM} element - the keyboard and the keys pressed
 */
function enterEdit(element) {
    if (element.code == "Enter") {
        element.target.style.fontStyle = null;
        element.target.contentEditable = false;
        element.target.blur();
        closeAllEdits();
    }
}

/**
 * Closes all of the abilites to edit a row in the worker table
 */
function closeAllEdits() {
    let editRows = document.querySelectorAll(".editActive");
    for (var i = 0; i < editRows.length; i++) {
        let cells = editRows[i].querySelectorAll(".row-text");
        for (var j = 0; j < cells.length; j++) { cells[j].contentEditable = false; }
        editRows[i].style.boxShadow = null;
        editRows[i].style.border = null;
        editRows[i].classList.remove("editActive");
    }

    let lateIconsInactive = document.querySelectorAll(".late-icon-table.inactive")
    for (var i = 0; i < lateIconsInactive.length; i++) { lateIconsInactive[i].style.display = "none" }

    let lateIconsActive = document.querySelectorAll(".late-icon-table.active");
    for (var i = 0; i < lateIconsActive.length; i++) {
        lateIconsActive[i].removeEventListener("click", toggleLateIcon);
        lateIconsActive[i].removeEventListener("mouseover", hoverLateIcon);
        lateIconsActive[i].style.cursor = null;
    }
}

/**
 * Validates a time passed, checking if AM or PM was inputted and changing the time accordingly
 * @param {String} time - the time passed in the form "HH:MM [AM|PM]*"
 * @returns {String} - a time in the correct format
 */
function validateTime(time) {
    const reg = /^[0-2]?[0-9]:[0-5][0-9](\s?(AM|PM)?)$/
    if (reg.test(time) == false) { return false; }
    else if (time.includes("AM")) {
        let newTime = time.replace("AM", "").trim();
        return newTime;
    }
    else if (time.includes("PM")) {
        let newTime = time.replace("PM", "").trim();
        newTime = newTime.split(":");
        let newHours = newTime[0];
        if (newHours != "12") { newHours = parseInt(newTime[0]) + 12 }
        let returnedTime = newHours + ":" + newTime[1]
        return returnedTime;
    }
    else { return time; }
}

/**
 * Clears every field on the popup to its default value
 */
function resetFields() {
    /* set popup input fields to default values */
    inputWorkerName.value = "Worker " + numWorkers;
    positionSelected.innerHTML = "Select";
    inputWorkerStartTime.value = "";
    inputWorkerEndTime.value = "";
    inputWorkerTips.value = "0.00";

    /* set popup time and tips row to default values */
    inputRowTime.style.opacity = "1";
    inputRowTips.style.opacity = "1";
    inputWorkerStartTime.readOnly = false;
    inputWorkerEndTime.readOnly = false;
    inputWorkerTips.readOnly = false;
    inputWorkerStartTime.style.cursor = null;
    inputWorkerEndTime.style.cursor = null;
    inputWorkerTips.style.cursor = null;

    /* set popup input field color to default values */
    inputWorkerName.style.color = "gray";
    positionSelected.style.color = "gray";
    inputWorkerTips.style.color = "gray";
    inputWorkerStartTime.style.color = "gray";
    inputWorkerEndTime.style.color = "gray";

    resetLateButton();
}

/**
 * Checks the worker position and modifies the popup if the dishwasher position is selected
 */
function checkPosition() {
    if (positionSelected.innerHTML == "Dishwasher") {
        inputRowTime.style.opacity = "0.25";
        inputRowTips.style.opacity = "0.25";
        inputWorkerStartTime.readOnly = true;
        inputWorkerEndTime.readOnly = true;
        inputWorkerTips.readOnly = true;
        inputWorkerStartTime.value = "";
        inputWorkerEndTime.value = "";
        inputWorkerTips.value = "0.00";
        inputWorkerStartTime.style.cursor = "not-allowed";
        inputWorkerEndTime.style.cursor = "not-allowed"
        inputWorkerTips.style.cursor = "not-allowed"
    }
    else {
        inputRowTime.style.opacity = "1";
        inputRowTips.style.opacity = "1";
        inputWorkerStartTime.readOnly = false;
        inputWorkerEndTime.readOnly = false;
        inputWorkerTips.readOnly = false;
        inputWorkerStartTime.style.cursor = null;
        inputWorkerEndTime.style.cursor = null;
        inputWorkerTips.style.cursor = null;
    }
}

/**
 * Verifies the form has valid inputs and then calls respective functions to print the results
 * @param {HTML DOM} element - the form element itself is passed in order to prevent it from refreshing
 */
function calculateTips(element) {
    element.preventDefault();

    let date = inputDate.value;
    let time = timeSelected.innerHTML;
    let overwrite = checkOverwrite(date, time);
    if (overwrite == true) {
        let manager = inputManager.value;
        if (manager == "Full Name" || manager == "") { alert("ERROR: Enter a valid Manager Name"); }
        else if (time == "Select") { alert("ERROR: Choose a time, Lunch or Dinner") }
        else {
            manager = manager.trim()
            if (validateDate(date)) {
                workerArray = [];
                cashTips = Math.round(parseFloat(inputCash.value));
                if (isNaN(cashTips)) {
                    cashTips = 0;
                    inputCash.value = "0.00"
                }
                foodSales = Math.round(parseFloat(inputFoodSales.value));
                if (isNaN(foodSales)) {
                    foodSales = 0;
                    inputFoodSales.value = "0.00";
                }
                tipPool = 0;
                totalPoints = 0;
                numDishwashers = 0;
                populateArray();
                tipPool = tipPool + cashTips;
                calculateResults();
                setFormFinalized();
            }
            else { alert("ERROR: Please enter a valid date in the format MM-DD-YYYY"); }
        }
    }
}

/**
 * Checks to see if a key already exists in the json
 * @param {String} date - the date of the key
 * @param {String} time - the time, either lunch or dinner, of the key
 * @returns {Boolean} - whether or not the key exists
 */
function checkOverwrite(date, time) {
    let key = getJSONKey(date, time);
    if (key in globalJSON) {
        return confirm(`WARNING: It looks like this date and time already exists. Are you sure you want to overwrite it?`)
    }
    else {
        return true;
    }
}

/**
 * Changes the styling of manager, date, time, cash tips, and food sales so it is no longer editable
 */
function setFormFinalized() {
    inputManager.style.pointerEvents = "none";
    inputManager.style.backgroundColor = "transparent";
    inputManager.style.fontSize = "16px";
    inputManager.style.border = "none";
    document.getElementById("select-manager-container").style.display = "none";

    inputDate.style.pointerEvents = "none";
    inputDate.style.backgroundColor = "transparent";
    inputDate.style.fontSize = "16px";
    inputDate.style.border = "none";
    buttonTodayDate.style.display = "none";

    dropdownSelectTime.style.backgroundColor = "transparent";
    dropdownSelectTime.style.border = "none";
    timeSelected.style.fontSize = "16px";
    dropdownSelectTime.style.pointerEvents = "none";
    document.getElementById("time-dropdown-arrow").style.display = "none";

    inputCash.style.pointerEvents = "none";
    inputCash.style.backgroundColor = "transparent";
    inputCash.style.fontSize = "16px";
    inputCash.style.border = "none";
    inputCash.style.color = "black";

    inputFoodSales.style.pointerEvents = "none";
    inputFoodSales.style.backgroundColor = "transparent";
    inputFoodSales.style.fontSize = "16px";
    inputFoodSales.style.border = "none";
    inputFoodSales.style.color = "black";
}

/**
 * Resets the manager, date, time, cash tips, and food sales input to its original styling
 */
function resetForm() {
    inputManager.style.pointerEvents = null;
    inputManager.style.backgroundColor = null;
    inputManager.style.fontSize = null;
    inputManager.style.border = null;
    getFrequentManagers();

    inputDate.style.pointerEvents = null;
    inputDate.style.backgroundColor = null;
    inputDate.style.fontSize = null;
    inputDate.style.border = null;
    buttonTodayDate.style.display = null;

    dropdownSelectTime.style.backgroundColor = null;
    dropdownSelectTime.style.border = null;
    timeSelected.style.fontSize = null;
    dropdownSelectTime.style.pointerEvents = null;
    document.getElementById("time-dropdown-arrow").style.display = null;

    inputCash.style.pointerEvents = null;
    inputCash.style.backgroundColor = null;
    inputCash.style.fontSize = null;
    inputCash.style.border = null;
    inputCash.style.color = "black";

    inputFoodSales.style.pointerEvents = null;
    inputFoodSales.style.backgroundColor = null;
    inputFoodSales.style.fontSize = null;
    inputFoodSales.style.border = null;
    inputFoodSales.style.color = "black";
}

/**
 * Validates a date to make sure it is in the correct format
 * @param {String} date - A date that should be in the format MM-DD-YYYY
 * @returns {Boolean} - whether or not the date is in correct format
 */
function validateDate(date) {
    if (date == "MM-DD-YYYY" || date == "") { return false; }

    let parsedDate = "";

    if (date.includes("-")) { parsedDate = date.split("-"); }
    else if (date.includes("/")) { parsedDate = date.split("/"); }
    else if (date.includes(".")) { parsedDate = date.split(".") }
    else { return false; }

    let month = parsedDate[0]
    let day = parsedDate[1]
    let year = parsedDate[2]

    if (isNaN(month) || isNaN(day) || isNaN(year)) { return false; }

    month = parseInt(month);
    day = parseInt(day);
    year = parseInt(year);

    if (month > 12 || month < 1) { return false; }
    if (day > 31 || day < 1) { return false; }
    if (year > 3000 || year < 1900) { return false; }

    return true;
}

/**
 * Creates an array of workers by grabbing all of the information from the worker table html
 */
function populateArray() {

    /* Loop and grab all the data from the worker table row by row, storing it in an array */
    for (var i = 1, row; row = workerTable.rows[i]; i++) {
        if (!row.cells[0].innerText.trim() == "") {
            let workerName = row.cells[0].innerText;
            workerName = workerName.trim();
            let workerPos = row.cells[1].innerText;
            workerPos = workerPos.trim();
            let workerHrs = row.cells[2].innerText;
            let html = row.cells[2].innerHTML;
            let workerPoints = 0;
            let wasLate = false;
            if (html.includes("late-icon-table active")) {
                workerPoints = -1;
                wasLate = true;
            }
            const workerTips = row.cells[3].innerText;
            if (workerPos == "Dishwasher") { workerPoints = "-" }
            const workerInfo = { name: workerName, position: workerPos, hours: parseFloat(workerHrs), tips: Math.round(parseFloat(workerTips)), wage: 0.00, points: workerPoints, late: wasLate };
            workerArray.push(workerInfo);
        }
    }

    /* Calculate the points and the total tip pool */
    for (var i = 0; i < workerArray.length; i++) {
        if (workerArray[i].position == "Dishwasher") { numDishwashers++; }
        else {
            tipPool = tipPool + workerArray[i].tips;
            let multiplier = 0;
            if (workerArray[i].position == "Server") { multiplier = 1.25 };
            if (workerArray[i].position == "Bartender") { multiplier = 1.00 };
            if (workerArray[i].position == "Barback") { multiplier = 0.5 };
            if (workerArray[i].position == "Expo") { multiplier = 0.5 };
            let workerPoints = workerArray[i].hours * multiplier;

            /* late flag check here: -1 if late, 0 if not late */
            workerPoints = workerPoints + workerArray[i].points;

            totalPoints = totalPoints + workerPoints;

            /* check for decimal place */
            let stringPoints = workerPoints.toString();
            if (stringPoints.includes(".")) {
                let decimalPoints = stringPoints.split(".");
                decimalPoints = decimalPoints[1];
                if (decimalPoints.length > 3) {
                    workerPoints = workerPoints.toFixed(3);
                }
            }
            workerArray[i].points = workerPoints;
        }
    }
}

/**
 * Calculate the wages of all of the workers by using the worker array and then prints it in a new
 * html results table
 */
function calculateResults() {

    const dishwasherAmount = Math.round(foodSales * 0.015);
    tipPool = tipPool - dishwasherAmount;

    let wagePerPoint = 0;
    if (totalPoints != 0) { wagePerPoint = tipPool / totalPoints; }

    if (isNaN(wagePerPoint)) { wagePerPoint = 0; }
    else { wagePerPoint = Math.round(wagePerPoint * 100) / 100; }
    console.log("Wage Per Point: " + wagePerPoint);

    workerTableResults.style.display = 'table';
    tableHeader.textContent = "Results Table";
    workerTable.style.display = 'none';
    workerTableResultsBody.innerHTML = ``;

    let amountPerDishwasher = Math.round(dishwasherAmount / numDishwashers);

    for (var i = 0; i < workerArray.length; i++) {
        let html = ``;
        if (workerArray[i].position === "Dishwasher") {
            workerArray[i].wage = amountPerDishwasher;
        }
        else {
            const wage = Math.round(workerArray[i].points * wagePerPoint);
            workerArray[i].wage = wage;
        }
        let name = workerArray[i].name;
        name = capitalizeFirstLetter(name);
        const position = workerArray[i].position;
        const workerWage = workerArray[i].wage;
        const points = workerArray[i].points;
        const wasLate = workerArray[i].late;
        if (wasLate) {
            html = `
            <tr class="results-row">
                <td>${name}</td>
                <td>${position}</td>
                <td>${workerWage}</td>
                <td class="points-cell">${points}<img class="late-icon-table active results" title="Worker was late, -1 Point" src="/icons/delay-icon-solid.svg">                </td>
            </tr>`;
        }
        else {
            html = `
            <tr class="results-row">
                <td>${name}</td>
                <td>${position}</td>
                <td>${workerWage}</td>
                <td>${points}</td>
            </tr>`;
        }

        workerTableResultsBody.insertAdjacentHTML("beforeend", html);
    }

    document.getElementById("save-button-container").style.display = 'flex';

    /* Add manager last to the worker array */
    let manager = inputManager.value;
    manager = capitalizeFirstLetter(manager);
    inputManager.value = manager;

    const managerInfo = { name: manager, position: "Manager", foodsales: parseFloat(inputFoodSales.value), cashtips: parseFloat(inputCash.value) };
    workerArray.push(managerInfo)

    /* populate table with empty rows if less than 8 workers */
    let numRows = workerTableResultsBody.getElementsByTagName("tr").length;
    if (numRows < 8) {
        for (var i = numRows; i < 8; i++) {
            let html = `
            <tr class="empty-row-results">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>`;
            workerTableResultsBody.insertAdjacentHTML("beforeend", html)
        }
    }

    /* If there are more than 8 workers, remove the last row, which would be empty with just the add worker
       button */
    let emptyRows = document.querySelectorAll(".empty-row");
    if (emptyRows.length == 1 && numWorkers >= 8) {
        emptyRows[0].remove();
    }

    /* hide the edit option on the worker table */
    let deleteOptions = document.querySelectorAll(".modify-container");
    for (var i = 0; i < deleteOptions.length; i++) {
        deleteOptions[i].style.display = "none";
    }

    /* remove the add worker option on the worker table */
    if (document.querySelector(".option")) {
        let addOption = document.querySelector(".option");
        addOption.remove();
    }

    document.getElementById("calculate-button-container").style.display = 'none';
    activateLeftArrow();
    convertToJSON();
}

/**
 * Re-adds the ability to edit a table and the day information
 */
function editTable() {
    let options = document.querySelectorAll(".modify-container");
    for (var i = 0; i < options.length; i++) { options[i].style.display = "flex"; }

    /* Re-add ability to add row */
    let emptyRows = document.querySelectorAll(".empty-row");
    if (emptyRows.length > 0) {
        emptyRows[0].innerHTML =
            `<tr class="empty-row">
                <td></td>
                <td></td>
                <td></td>
                <td><div class="option"><p onclick="openPopup()">+</p></div></td>
            </tr>`;
    }
    else {
        let html = `       
        <tr class="empty-row">
            <td></td>
            <td></td>
            <td></td>
            <td><div class="option"><p onclick="openPopup()">+</p></div></td>
        </tr>`;
        workerTableBody.insertAdjacentHTML("beforeend", html);
    }

    /* Re-add ability to edit form */
    resetForm();

    document.getElementById("save-button-container").style.display = 'none';
    document.getElementById("calculate-button-container").style.display = 'flex';

    goToWorkerTable();
    deactivateRightArrow();
    deactivateLeftArrow();
}

/**
 * Capitalizes the first letter of a string
 * @param {String} string - the string to be edited
 * @returns {String} - the same string, just with the first letter capitalized
 */
function capitalizeFirstLetter(string) {
    let capitalizedString = "";
    if (hasWhiteSpace(string)) {
        let stringArr = string.split(" ");
        for (var i = 0; i < stringArr.length; i++) {
            capitalizedString = capitalizedString + " " + stringArr[i].charAt(0).toUpperCase() + stringArr[i].slice(1)
        }
    }
    else {
        capitalizedString = string.charAt(0).toUpperCase() + string.slice(1)
    }
    return capitalizedString;
}

/**
 * Checks if a string has a space
 * @param {String} string - the string to be checked
 * @returns true or false, depending on if the string has a whitespace
 */
function hasWhiteSpace(string) {
    return string.indexOf(' ') >= 0;
}

/**
 * Stores the worker array with its corresponding date as the key in a JSON object
 */
function convertToJSON() {
    let date = inputDate.value;
    let time = timeSelected.innerHTML;
    let key = getJSONKey(date, time);
    globalJSON[key] = workerArray
    if (connectionFailed == false) { checkUpdateRequired(); }
    else { saveJSONLocally(); }
}

/**
 * Forces saving of a day's PDF 
 */
function saveJSONLocally() {
    buttonSavePDF.click();
    printAlert("Tip Result has been saved locally successfully. You may now upload it through the website to add it to the server.");
}

/**
 * Prints a specified message to the alert object
 * @param {String} message - the string to be outputted in the alert message
 */
function printAlert(message) {
    alertMessage.style.display = 'flex';
    let messageElement = document.getElementById("alert-msg-txt");
    messageElement.innerHTML = message;
    setTimeout(() => { alertMessage.style.display = 'none'; }, 10000);
}

/**
 * Converts a date and time into a valid JSON key
 * @param {String} date - the date pass
 * @param {String} time 
 * @returns - A key for the JSON, in the form "MM-DD-YYYY_[Lunch|Dinner]"
 */
function getJSONKey(date, time) {
    let parsedDate = "";
    if (date.includes("-")) { parsedDate = date.split("-"); }
    else if (date.includes("/")) { parsedDate = date.split("/"); }
    else if (date.includes(".")) { parsedDate = date.split(".") }
    let month = parsedDate[0]
    if (month) { if (month.length == 1) { month = "0" + month } }
    let day = parsedDate[1]
    let year = parsedDate[2]
    let key = month + "-" + day + "-" + year + "_" + time
    return key;
}

/**
 * Checks if updating the json stored on the server is necessary by comparing the retrieved server json
 * to the local json
 */
function checkUpdateRequired() {
    Object.entries(globalJSON).forEach((entry) => {
        const [key, value] = entry

        /* if key is not in the server json, update it */
        if (!(key in retrievedJSON)) { updateJSON(); }
        else {
            /* if the key exists but its values are different, update the server json */
            let retrievedArray = retrievedJSON[key]
            if (value != retrievedArray) { updateJSON(); }
        }
    });
}

/**
 * Updates the json that is stored on the server by overwriting it
 */
function updateJSON() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            if (req.readyState == 4 && req.status == 200) {
                if (uploadedDates.length > 0) {
                    let allDates = "";
                    for (var i = 0; i < uploadedDates.length; i++) {
                        if (i + 1 >= uploadedDates.length) {
                            allDates += uploadedDates[i] + "";
                        }
                        else {
                            allDates += uploadedDates[i] + ", ";
                        }

                    }
                    printAlert("Successfully updated for:\n" + allDates);
                } else {
                    printAlert("Successfully updated!");
                }
                printToContainer();
                printDatesToCashReport();
            }
            else {
                saveJSONLocally();
                printAlert("ERROR: Could not connect to the server. Result has been saved locally. Please upload it when there is an active internet connection.");
            }
        }
    };
    if (connectionFailed == false) {
        req.open("PUT", "https://api.jsonbin.io/v3/b/" + apiKey, true);
        req.setRequestHeader("Content-Type", "application/json");
        req.setRequestHeader("X-Master-Key", apiMasterKey);
        req.setRequestHeader("X-Bin-Versioning", "true");
        if (serverActive) { req.send(JSON.stringify(globalJSON)); }
    }
}

/**
 * Retrieves the json that is stored on the server, which contains all of the previous worker's tip history
 */
function getJSON() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            if (req.readyState == 4 && req.status == 200) {
                JSONToArray(JSON.parse(req.responseText));
                printAlert("Connected to Server!");
                connectionFailed = false;
            }
            else {
                printAlert("ERROR: Could not connect to the server. Please check your internet connection. Tip History will not be available and any dates calculated will be downloaded locally.");
                connectionFailed = true;
                connectionFailedForm();
            }
        }
    };

    req.open("GET", "https://api.jsonbin.io/v3/b/" + apiKey + "/latest", true);
    req.setRequestHeader("X-Master-Key", apiMasterKey);
    req.setRequestHeader("X-Bin-Meta", false);
    if (serverActive) { req.send(); }
}

/**
 * If an internet connection is not present, remove internet-required abilities
 */
function connectionFailedForm() {
    buttonTodayDate.style.display = "none";
    buttonSelectShift.style.display = "none";
    document.querySelector(".upload-button-container").style.display = "none";
}

/**
 * Converts a json object to an array
 * @param {object} json - the json value that has been retrieved from the server
 */
function JSONToArray(json) {
    Object.entries(json).forEach((entry) => {
        const [key, value] = entry
        if (!(key in globalJSON)) { globalJSON[key] = value }
        retrievedJSON[key] = value
    });

    getFrequentManagers();
    getFrequentWorkers();
    printToContainer();
    printDatesToCashReport();
}

/**
 * Saves the json global object as a text file
 */
function saveJSON() {
    let today = moment().format("MM-DD-YYYY");
    let fileName = today + "_json.txt"
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(globalJSON, null, 2)], {
        type: "application/json"
    }));
    a.setAttribute("download", fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

/**
 * Prints the global json's keys, which are the dates, as a list in the tip history tab
 */
function printToContainer() {
    let dateActive = "";

    if (document.getElementsByClassName("date-selected").length > 0) { dateActive = document.querySelector(".date-selected").innerText; }

    let list = document.getElementById("history-list");
    list.innerHTML = '';
    let dates = [];
    for (const [key, value] of Object.entries(globalJSON)) {
        let dateTime = key.split("_");
        let date = dateTime[0];
        if (!(dates.includes(date))) {
            dates.push(date);
        }
    }

    dates.sort();

    for (var i = 0; i < dates.length; i++) {
        let html = ``;
        let date = dates[i];
        if (date == dateActive) { html = `<p class="date-item date-selected" onclick="clickedDate(this)">${date}</p>`; }
        else { html = `<p class="date-item" onclick="clickedDate(this)">${date}</p>`; }
        list.insertAdjacentHTML("beforeend", html);
    }
}

/**
 * Displays the left arrow to go to the worker table
 */
function activateLeftArrow() {
    if (!(leftArrow.classList.contains("active"))) { leftArrow.classList.add("active"); }
}

/**
 * Hides the left arrow
 */
function deactivateLeftArrow() {
    if (leftArrow.classList.contains("active")) { leftArrow.classList.remove("active"); }
}

/**
 * Displays the worker table and hides the results table, provided the left arrow is active
 */
function goToWorkerTable() {
    if (leftArrow.classList.contains("active")) {
        workerTable.style.display = "table";
        workerTableResults.style.display = 'none';
        tableHeader.textContent = "Worker Table";
        leftArrow.classList.remove("active");
        activateRightArrow();
    }
}

/**
 * Displays the right arrow to go to the results table
 */
function activateRightArrow() {
    if (!(rightArrow.classList.contains("active"))) {
        rightArrow.classList.add("active");
    }
}

/**
 * Hides the right arrow
 */
function deactivateRightArrow() {
    if (rightArrow.classList.contains("active")) {
        rightArrow.classList.remove("active");
    }
}

/**
 * Displays the results table and hides the worker table, provided the right arrow is active
 */
function goToResultsTable() {
    if (rightArrow.classList.contains("active")) {
        workerTable.style.display = "none";
        workerTableResults.style.display = 'table';
        tableHeader.textContent = "Results Table";
        rightArrow.classList.remove("active");
        activateLeftArrow();
    }
}

/**
 * Checks if the backspace key is pressed
 * @param {HTML DOM} element - the object that contains the key pressed information
 */
function checkBackspace(element) {
    if (element.key == "Backspace") { backspacePressed = true }
    else { backspacePressed = false; }
}

/**
 * Automatically adds a hyphen to the date after a month and day has been inputted, provided
 * certain conditions are met
 */
function addHyphen() {
    if (backspacePressed == false) {

        /* Check for a valid month before adding a hyphen */
        if (parseInt(inputDate.value) >= 2 && inputDate.value.length == 1 && !isNaN(inputDate.value)) {
            inputDate.value += '-';
        }
        else if (inputDate.value.length == 2 && !isNaN(inputDate.value) && parseInt(inputDate.value) <= 12) {
            inputDate.value += '-';
        }

        /* Check for a valid day before adding a hyphen */
        if (inputDate.value.length == 4) {
            let day = inputDate.value;
            day = day[2] + day[3]
            if (!isNaN(day) && (parseInt(day) >= 1 && parseInt(day) <= 31)) { inputDate.value += '-'; }
        }
        else if (inputDate.value.length == 5) {
            let day = inputDate.value;
            day = day[3] + day[4]
            if (!isNaN(day) && (parseInt(day) >= 1 && parseInt(day) <= 31)) { inputDate.value += '-'; }
        }
    }
}

/**
 * Resets the form to its default values
 */
function restartCalculator() {
    getFrequentManagers();
    getFrequentWorkers();
    resetForm();
    workerArray = [];

    const tableSize = workerTable.rows.length;
    for (var i = 1; i < tableSize; i++) { workerTable.deleteRow(1); }

    const tableResultsSize = workerTableResults.rows.length;
    for (var i = 1; i < tableResultsSize; i++) { workerTableResults.deleteRow(1); }
    workerTableResults.style.display = 'none';

    let html = `       
    <tr class="empty-row">
        <td></td>
        <td></td>
        <td></td>
        <td><div class="option"><p onclick="openPopup()">+</p></div></td>
    </tr>`;
    workerTableBody.insertAdjacentHTML("beforeend", html);

    // add 7 empty rows, for 8 empty rows total
    for (var i = 0; i < 7; i++) {
        let html = `       
        <tr class="empty-row">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>`;
        workerTableBody.insertAdjacentHTML("beforeend", html);
    }

    numWorkers = 1;
    numDishwashers = 0;
    inputWorkerName.value = "Worker " + numWorkers;
    positionSelected.innerHTML = "Select";
    inputWorkerStartTime.value = "";
    inputWorkerEndTime.value = "";
    inputManager.value = "Full Name";
    inputWorkerTips.value = "0.00";
    inputCash.value = "0.00";
    inputFoodSales.value = "0.00";
    inputDate.value = "MM-DD-YYYY";
    timeSelected.innerHTML = "Select";
    inputManager.style.color = "gray";
    inputDate.style.color = "gray";
    inputCash.style.color = "gray";
    inputFoodSales.style.color = "gray";
    dropdownSelectTime.style.color = "gray";
    inputWorkerName.style.color = "gray";
    inputWorkerStartTime.style.color = "gray";
    inputWorkerEndTime.style.color = "gray";
    inputWorkerTips.style.color = "gray";
    positionSelected.style.color = "gray";

    document.getElementById("save-button-container").style.display = 'none';
    document.getElementById("calculate-button-container").style.display = 'flex';

    goToWorkerTable();
    deactivateRightArrow();
    deactivateLeftArrow();
}

/**
 * Prints the results table as a PDF
 */
function printResults() {
    var doc = new jsPDF();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    let date = inputDate.value

    let parsedDate = "";
    if (date.includes("-")) { parsedDate = date.split("-"); }
    else if (date.includes("/")) { parsedDate = date.split("/"); }
    else if (date.includes(".")) { parsedDate = date.split(".") }

    let numMonth = parsedDate[0]
    if (numMonth) { if (numMonth.length == 1) { numMonth = "0" + numMonth } }

    let month = getMonth(numMonth);
    let day = parsedDate[1]
    let year = parsedDate[2]
    if (year) { if (year.length == 2) { year = "'" + year } }

    let time = timeSelected.innerHTML
    let dateTimeString = ""
    if (day && month && year) { dateTimeString = month + " " + day + ", " + year + " - " + time }

    let manager = inputManager.value;
    let managerString = "Closing Manager: " + manager

    /* doc.text takes x, y, string parameters */
    doc.text(pageWidth / 2, 15, dateTimeString + " Tip Report", { align: 'center' })
    doc.setFontSize(12);
    doc.text(pageWidth / 2, 23, managerString, { align: 'center' })
    let dayInfoString = "Food Sales: $" + foodSales + ", Cash Tips: $" + cashTips
    doc.text(pageWidth / 2, 31, dayInfoString, { align: 'center' })

    doc.text(pageWidth / 2, 39, "Worker Table", { align: 'center' })

    doc.autoTable({
        startY: 36,
        html: '#worker-table',
        theme: 'striped',
        headStyles: {
            halign: 'left',
            fillColor: [29, 17, 71],
            textColor: [255, 255, 255],
            lineWidth: 0,
        },
        styles: {
            halign: 'left',
            textColor: [0, 0, 0],
            lineColor: [0, 0, 0],
            fontStyle: "normal",
            lineWidth: 0
        }
    });

    let rows = document.getElementById("worker-table").rows.length;
    let tableHeight = rows * 8.75;
    let yCoord = 36 + tableHeight

    doc.text(pageWidth / 2, yCoord, "Results Table", { align: 'center' })

    doc.autoTable({
        startY: yCoord + 5,
        html: '#worker-table-results',
        theme: 'striped',
        headStyles: {
            halign: 'left',
            fillColor: [29, 17, 71],
            textColor: [255, 255, 255],
            fontStyle: "normal",
            lineWidth: 0,
        },
        styles: {
            halign: 'left',
            textColor: [0, 0, 0],
            lineColor: [0, 0, 0],
            lineWidth: 0,
        }
    });

    let strNumber = ""
    if (numMonth && day && year) { strNumber = numMonth + "." + day + "." + year }

    let pdfName = "Tips.pdf"
    if (strNumber) { pdfName = strNumber + " " + timeSelected.innerHTML + " Tips.pdf" }
    doc.save(pdfName);
}

/**
 * Converts a numbered month value to its corresponding month as a string
 * @param {string} numMonth - the month as a numerical value
 * @returns {string} the corresponding month as a string
 */
function getMonth(numMonth) {
    if (numMonth == "01") { return "January" }
    if (numMonth == "02") { return "February" }
    if (numMonth == "03") { return "March" }
    if (numMonth == "04") { return "April" }
    if (numMonth == "05") { return "May" }
    if (numMonth == "06") { return "June" }
    if (numMonth == "07") { return "July" }
    if (numMonth == "08") { return "August" }
    if (numMonth == "09") { return "September" }
    if (numMonth == "10") { return "October" }
    if (numMonth == "11") { return "November" }
    if (numMonth == "12") { return "December" }
    return "";
}

/**
 * Changes a input field's color and value depending on what value it currently has when it is clicked
 * @param {HTML DOM} element - the HTML object that is used to check what its value is
 */
function changeInput(element) {
    element.target.style.color = "black";

    /* check if the manager's default value is present */
    if (element.target.value == "Full Name") { element.target.value = ""; }
    /* check if the date's default value is present */
    else if (element.target.value == "MM-DD-YYYY") { element.target.value = ""; }
    /* check if the food sales, cash, or tips's default value are present */
    else if (element.target.value == "0.00") { element.target.value = ""; }
    /* check if a dropdown's default value is present */
    else if (element.target.value == "Select") { element.target.style.color = "gray"; }
    /* check if the worker's name's default value is present */
    else if (element.target.value.includes("Worker")) { element.target.value = ""; }
}

/**
 * Changes the styling of an input to be black, to show that it has been edited
 * @param {HTML DOM} element - an HTML object, the input field that is currently being used
 */
function inputEdited(element) {
    element.target.style.color = "black";
}

/**
 * Changes the date and time input values based on what time it currently is
 */
function setTodaysDate() {
    const current = moment().local()
    let date = current.format("MM-DD-YYYY");
    let time = current.format("HH");
    inputDate.style.color = "black";
    inputDate.value = date;

    dropdownSelectTime.style.color = "black";
    dropdownSelectTime.style.borderColor = null;
    document.getElementById("time-dropdown-arrow").style.filter = "brightness(0%)";

    /* If after 5 pm, set time to Dinner */
    if (parseInt(time) > 17) { timeSelected.innerHTML = "Dinner"; }
    else { timeSelected.innerHTML = "Lunch"; }
}

/**
 * Shows the manager dropdown menu
 */
function toggleManagerOptions() {
    if (dropdownManagerOptions.style.display == "flex") {
        dropdownManagerOptions.style.display = "none";
        buttonSelectManager.style.borderColor = null;
    }
    else if (dropdownManagerOptions.style.display == "none") {
        dropdownManagerOptions.style.display = "flex";
        buttonSelectManager.style.borderColor = "black";
    }
    else {
        dropdownManagerOptions.style.display = "flex"
        buttonSelectManager.style.borderColor = "black";
    }
}

/**
 * Shows the shift time dropdown menu
 */
function toggleShiftOptions() {
    if (dropdownShiftOptions.style.display == "flex") {
        dropdownShiftOptions.style.display = "none";
        buttonSelectShift.style.borderColor = null;
    }
    else if (dropdownShiftOptions.style.display == "none") {
        dropdownShiftOptions.style.display = "flex";
        buttonSelectShift.style.borderColor = "black";

    }
    else {
        dropdownShiftOptions.style.display = "flex"
        buttonSelectShift.style.borderColor = "black";
    }
}

/**
 * Closes all dropdowns when clicked anywhere on the webpage
 * @param {HTML DOM} element - the HTML object 
 */
function closeOptions(element) {
    if (pageTipCalculator.style.display && pageTipCalculator.style.display != "none") {
        let id = element.target.getAttribute("id");

        let dropdownId = "";

        /* Check if parent has an id, as you need to get the highest element in the hierchy */
        if (element.target.parentElement.getAttribute("id")) {
            id = element.target.parentElement.getAttribute("id")
        }

        if (element.target.parentElement.parentElement) {
            dropdownId = element.target.parentElement.parentElement.getAttribute("id");
        }

        /* fire event listener as long as the button or dropdown are not pressed */
        if (id != "select-manager-button") {
            if (dropdownId != "manager-options") {
                dropdownManagerOptions.style.display = "none";
                buttonSelectManager.style.borderColor = null;
            }
        }
        if (id != "select-worker-button") {
            if (dropdownId != "worker-options") {
                dropdownWorkerOptions.style.display = "none";
                buttonSelectWorker.style.borderColor = null;
            }
        }
        if (id != "time-dropdown-input") {
            if (dropdownId != "time-dropdown-options") {
                dropdownTimeOptions.style.display = "none";
                dropdownSelectTime.style.borderColor = null;
                document.getElementById("time-dropdown-arrow").style.filter = "opacity(0.5) drop-shadow(0 0 0 rgb(180, 180, 180))";

            }
        }
        if (id != "position-dropdown-input") {
            if (dropdownId != "position-dropdown-options") {
                dropdownSelectPositionOptions.style.display = "none";
                dropdownSelectPosition.style.borderColor = null;
                document.getElementById("position-dropdown-arrow").style.filter = "opacity(0.5) drop-shadow(0 0 0 rgb(180, 180, 180))";
            }
        }
        if (id != "select-shift-button") {
            if (dropdownId != "shift-options") {
                dropdownShiftOptions.style.display = "none";
                buttonSelectShift.style.borderColor = null;
            }
        }
    }
}

/**
 * Prints the most common managers in order to the manager dropdown menu
 */
function getFrequentManagers() {
    let managerArray = {}

    Object.entries(globalJSON).forEach((entry) => {
        const [key, array] = entry
        for (var i = 0; i < array.length; i++) {
            if (array[i].position == "Manager") {
                let name = array[i].name;
                name = name.trim();
                if (name in managerArray) {
                    let value = managerArray[name];
                    value = value + 1;
                    managerArray[name] = value;
                }
                else {
                    managerArray[name] = 1;
                }
            }
        }
    });

    let topManagers = sortDictionary(managerArray);

    let managerCap = 15;
    let managerNum = 1;
    dropdownManagerOptions.innerHTML = "";
    for (var i = 0; i < topManagers.length; i++) {
        let elementID = "manager-option-" + managerNum
        let elementIDText = "manager-option-" + managerNum + "-text"
        if (managerCap > 0) {
            let html = ` 
            <div class="dropdown-option" id="${elementID}">
                <p class="manager-text" id="${elementIDText}">${topManagers[i]}</p>
            </div>
            `;
            dropdownManagerOptions.insertAdjacentHTML("beforeend", html);
            let dropdownElement = document.getElementById(elementID)
            dropdownElement.addEventListener("click", changeManager);
            dropdownElement.classList.add("active-manager-option");
        }
        managerCap--;
        managerNum++;
    }

    let optionList = document.querySelectorAll(".active-manager-option");
    if (optionList.length >= 1) {
        optionList[0].classList.add("first");
        let optionListLength = optionList.length;
        optionList[optionListLength - 1].classList.add("last");
        document.getElementById("select-manager-container").style.display = "flex";
    }
}

/**
 * Changes the manager input value based on the option selected
 * @param {HTML DOM} element - an HTML object with the manager option
 */
function changeManager(element) {
    inputManager.style.color = "black";
    /* if a dropdown option is clicked but not the text itself */
    if (element.target.parentElement.getAttribute("id") == "manager-options") {
        inputManager.value = element.target.querySelector(".manager-text").innerHTML;
    }
    else { inputManager.value = element.target.innerHTML }
    dropdownManagerOptions.style.display = "none";
    buttonSelectManager.style.borderColor = null;
}

/**
 * Sorts a dictionary that has elements as {name, count}. It sorts based on the count
 * @param {Object} dict - a dictionary with the worker names and the number of times the name appears in the json
 * @returns {Array} - an array with just the names, but in order of their count
 */
function sortDictionary(dict) {
    let items = Object.keys(dict).map(function (key) { return [key, dict[key]]; });

    /* Sort the array based on the second element, the count */
    items.sort(function (first, second) { return second[1] - first[1]; });

    /* store and return the sorted names only */
    let names = [];
    for (var i = 0; i < items.length; i++) { names[i] = items[i][0]; }
    return names;
}

/**
 * Prints the most common workers in order to the worker dropdown menu
 */
function getFrequentWorkers() {
    let workerArray = {};
    Object.entries(globalJSON).forEach((entry) => {
        const [key, array] = entry
        for (var i = 0; i < array.length; i++) {
            if (array[i].position != "Manager") {
                let name = array[i].name;
                name = name.trim();
                if (name in workerArray) {
                    let value = workerArray[name];
                    value = value + 1;
                    workerArray[name] = value;
                }
                else {
                    workerArray[name] = 1;
                    workerPosition[name] = array[i].position;
                }
            }
        }
    });

    let topWorkers = sortDictionary(workerArray);
    let workerCap = 14;
    let workerNum = 1;
    dropdownWorkerOptions.innerHTML = "";
    for (var i = 0; i < topWorkers.length; i++) {
        let elementID = "worker-option-" + workerNum
        let elementIDText = "manager-option-" + workerNum + "-text"
        if (workerCap > 0) {
            let html = ` 
            <div class="dropdown-option" id="${elementID}">
                <p class="worker-text" id="${elementIDText}">${topWorkers[i]}</p>
            </div>
            `;
            dropdownWorkerOptions.insertAdjacentHTML("beforeend", html);
            let dropdownElement = document.getElementById(elementID)
            dropdownElement.addEventListener("click", changeWorker);
            dropdownElement.classList.add("active-worker-option");
        }
        workerCap--;
        workerNum++;
    }

    let optionList = document.querySelectorAll(".active-worker-option");
    if (optionList.length >= 1) {
        document.getElementById("select-worker-container").style.display = "flex";
        let optionListLength = optionList.length;
        optionList[0].classList.add("first");
        optionList[optionListLength - 1].classList.add("last");
    }
}

/**
 * Changes the worker input value based on the option selected
 * @param {HTML DOM} element - an HTML object with the worker option
 */
function changeWorker(element) {
    inputWorkerName.style.color = "black";
    let name = "";
    /* If a dropdown option is clicked but not the text itself */
    if (element.target.parentElement.getAttribute("id") == "worker-options") {
        name = element.target.querySelector(".worker-text").innerHTML
        inputWorkerName.value = name;
    }
    else {
        name = element.target.innerHTML;
        inputWorkerName.value = name;
    }
    dropdownWorkerOptions.style.display = "none";

    /* Change position input automatically */
    if (name in workerPosition) {
        positionSelected.style.color = "black";
        positionSelected.innerHTML = workerPosition[name];
        checkPosition();
    }
}

/**
 * Shows the worker's name dropdown menu
 */
function toggleWorkerOptions() {
    if (dropdownWorkerOptions.style.display == "flex") {
        dropdownWorkerOptions.style.display = "none";
        buttonSelectWorker.style.borderColor = null;
    }
    else if (dropdownWorkerOptions.style.display == "none") {
        dropdownWorkerOptions.style.display = "flex";
        buttonSelectWorker.style.borderColor = "black";
    }
    else {
        dropdownWorkerOptions.style.display = "flex";
        buttonSelectWorker.style.borderColor = "black";
    }
}

/**
 * Shows the day's time dropdown menu
 */
function toggleTimeOptions() {
    if (dropdownTimeOptions.style.display == "flex") {
        dropdownSelectTime.style.borderColor = null;
        dropdownTimeOptions.style.display = "none";
        document.getElementById("time-dropdown-arrow").style.filter = "opacity(0.5) drop-shadow(0 0 0 rgb(180, 180, 180))";
    }
    else if (dropdownTimeOptions.style.display == "none") {
        dropdownSelectTime.style.borderColor = "black";
        dropdownTimeOptions.style.display = "flex";
        document.getElementById("time-dropdown-arrow").style.filter = "brightness(0%)"
    }
    else {
        dropdownSelectTime.style.borderColor = "black";
        dropdownTimeOptions.style.display = "flex";
        document.getElementById("time-dropdown-arrow").style.filter = "brightness(0%)"
    }
}

/**
 * Shows the worker's positions dropdown menu
 */
function toggleWorkerPositionsOptions() {
    if (dropdownSelectPositionOptions.style.display == "flex") {
        dropdownSelectPosition.style.borderColor = null;
        dropdownSelectPositionOptions.style.display = "none";
        document.getElementById("position-dropdown-arrow").style.filter = "opacity(0.5) drop-shadow(0 0 0 rgb(180, 180, 180))";
    }
    else if (dropdownSelectPositionOptions.style.display == "none") {
        dropdownSelectPosition.style.borderColor = "black";
        dropdownSelectPositionOptions.style.display = "flex";
        document.getElementById("position-dropdown-arrow").style.filter = "brightness(0%)";
    }
    else {
        dropdownSelectPosition.style.borderColor = "black";
        dropdownSelectPositionOptions.style.display = "flex"
        document.getElementById("position-dropdown-arrow").style.filter = "brightness(0%)";
    }
}