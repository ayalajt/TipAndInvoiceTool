const tabCashReports = document.getElementById("tab_cash_reports");
const cashReports = document.getElementById("cash_reports");
const buttonSelectDates = document.getElementById("select-cash-total");
const buttonSelectDatesCalculate = document.getElementById("calculate-select-cash-total");
const buttonSelectDatesClear = document.getElementById("clear-select-cash-total")
const buttonSelectDatesReset = document.getElementById("reset-select-cash-total")
const buttonForceSave = document.getElementById("force-save-button");
const buttonLogin = document.getElementById("cash-login-button");
const messageCashTotal = document.getElementById("total-select-msg-cash");
const datesContainer = document.getElementById("history-list-cash");
const lunchTipValue = document.getElementById("lunch-day-tip");
const dinnerTipValue = document.getElementById("dinner-day-tip");
const totalDayTipValue = document.getElementById("day-tip-total")
const totalTipValue = document.getElementById("total-cash-amount");
const cashForm = document.getElementById("cash-form");
let toastAmount = document.getElementById("toast-amount");
const cashUsername = document.getElementById("cash-username");
const cashPassword = document.getElementById("cash-password");

tabCashReports.addEventListener("click", openCashReports);
buttonSelectDates.addEventListener("click", startSelectingDates);
buttonSelectDatesCalculate.addEventListener("click", calculateSelectedDates);
buttonSelectDatesClear.addEventListener("click", resetDefaultCash);
buttonSelectDatesReset.addEventListener("click", resetDefaultCash);
buttonLogin.addEventListener("click", checkLogin);
buttonForceSave.addEventListener("click", forceSave);
toastAmount.addEventListener("keypress", enterCheck);
toastAmount.addEventListener("click", changeDefault);
document.addEventListener("click", closeToastCash);
cashUsername.addEventListener("keydown", checkCashLogin);
cashPassword.addEventListener("keydown", checkCashLogin);

let apiCashKey = "";
let cashJSON = {};
let loginSuccessful = false;

/**
 * Checks if enter is pressed when the user is logging in
 * @param {HTML DOM} element 
 */
function checkCashLogin(element) {
    if (element.code == "Enter") {
        checkLogin();
    }  
}

/**
 * Checks to see if the username and password submitted are correct
 */
function checkLogin() {
    if (loginRetrieved) {
        let user = document.getElementById("cash-username").value;
        let password = document.getElementById("cash-password").value;
        if (user == cashLoginUsername && password == cashLoginPassword) {
            document.getElementById("cash-reports-main").style.display = "flex";
            document.getElementById("login-popup").style.display = "none";
            loginSuccessful = true;
            getCashJSON();
        }
        else { printAlert("Incorrect login!"); }
    }
}


/**
 * Starts the process of adding up dates by allowing the user to select multiple dates
 */
function startSelectingDates() {
    messageCashTotal.innerText = "Select dates to add together";
    messageCashTotal.style.display = "flex";
    let paras = document.querySelectorAll(".date-selected-cash");
    for (var i = 0; i < paras.length; i++) { paras[i].classList.remove("date-selected-cash"); }

    buttonSelectDates.style.display = "none";
    buttonForceSave.style.display = "none";
    buttonSelectDatesCalculate.style.display = "flex";
    buttonSelectDatesClear.style.display = "flex";
    datesContainer.addEventListener("click", addSelectedDate);
}

/**
 * Adds a class to a clicked date, highlighting that it has been selected
 * * @param {HTML DOM} element - an html object where the user clicked inside the date container
 */
function addSelectedDate(element) {
    if (element.target.classList.contains("date-item-cash")) {
        if (!(element.target.classList.contains('date-select-total'))) { element.target.classList.add('date-select-total'); }
        else { element.target.classList.remove("date-select-total"); }

        if (element.target.classList.contains("date-selected-cash")) { element.target.classList.remove("date-selected-cash") }
    }
}

/**
 * Calculates the total of the selected dates
 */
function calculateSelectedDates() {
    let paras = document.querySelectorAll(".date-select-total");
    let toastTotal = 0;
    let cashTipsTotal = 0;
    let lunchTipsTotal = 0;
    let dinnerTipsTotal = 0;
    let actualTotal = 0;
    for (var i = 0; i < paras.length; i++) {
        let date = paras[i].innerText
        let lunchTips = getLunchCashTips(date);
        let dinnerTips = getDinnerCashTips(date);
        lunchTipsTotal += parseFloat(lunchTips);
        dinnerTipsTotal += parseFloat(dinnerTips);
        let dayTotal = parseFloat(lunchTips) + parseFloat(dinnerTips);
        cashTipsTotal += parseFloat(dayTotal);
        if (cashJSON[date]) { toastTotal += parseFloat(cashJSON[date]) }
    }

    actualTotal = lunchTipsTotal + dinnerTipsTotal + cashTipsTotal + toastTotal;

    lunchTipValue.innerText = lunchTipsTotal.toFixed(2);
    dinnerTipValue.innerText = dinnerTipsTotal.toFixed(2);
    totalDayTipValue.innerText = cashTipsTotal.toFixed(2);
    toastAmount.value = toastTotal.toFixed(2);
    totalTipValue.innerText = actualTotal.toFixed(2);

    let dates = document.querySelectorAll(".date-item-cash");
    for (var i = 0; i < dates.length; i++) { dates[i].style.pointerEvents = "none"; }

    buttonSelectDatesCalculate.style.display = "none";
    buttonSelectDatesClear.style.display = "none";
    buttonSelectDatesReset.style.display = "flex";
    messageCashTotal.innerText = "Total Cash";
}

/**
 * Forces the cash JSON to be updated if the user clicks the "save" button on the daily cash report
 */
function forceSave() {
    let totalTips = totalDayTipValue.innerText;
    let toastCash = toastAmount.value;
    let total = parseFloat(totalTips) + parseFloat(toastCash);
    total = total.toFixed(2);
    totalTipValue.innerText = total;

    let currentDate = document.querySelector(".date-selected-cash").innerText;
    if (cashJSON[currentDate] != toastAmount.value) {
        cashJSON[currentDate] = toastAmount.value
        updateCashJSON();
    }
}

/**
 * Resets the cash form and the date container to the default values 
 */
function resetDefaultCash() {
    cashForm.style.display = "none";
    buttonForceSave.style.display = "flex";
    messageCashTotal.style.display = "none";
    lunchTipValue.innerText = "0.00";
    dinnerTipValue.innerText = "0.00";
    totalDayTipValue.innerText = "0.00";
    toastAmount.value = "0.00";
    totalTipValue.innerText = "0.00";
    datesContainer.removeEventListener("click", addSelectedDate);

    buttonSelectDates.style.display = "flex";
    buttonSelectDatesCalculate.style.display = "none";
    buttonSelectDatesClear.style.display = "none";
    buttonSelectDatesReset.style.display = "none";

    let paras = document.querySelectorAll(".date-select-total");
    for (var i = 0; i < paras.length; i++) { paras[i].classList.remove("date-select-total"); }

    paras = document.querySelectorAll(".date-selected-cash");
    for (var i = 0; i < paras.length; i++) { paras[i].classList.remove("date-selected-cash"); }

    let dates = document.querySelectorAll(".date-item-cash");
    for (var i = 0; i < dates.length; i++) { dates[i].style.pointerEvents = null; }
}

/**
 * Displays the cash report HTML
 */
function openCashReports() {
    cashReports.style.display = "flex";
    tabTip.style.display = 'none';
    tabTotal.style.display = 'none';

    let activeTabs = document.querySelectorAll(".tab.active");
    for (var i = 0; i < activeTabs.length; i++) { activeTabs[i].classList.remove("active"); }
    tabCashReports.classList.add("active");
}

/**
 * If the user clicks anywhere in the document while the toast cash input is active, 
 * unfocus the toast cash input and updat the cash JSON if necessary
 * @param {HTML DOM} element - an HTML object, the toast cash input
 */
function closeToastCash(element) {
    if (cashReports.style.display == "flex") {
        if (document.activeElement.getAttribute("id") == "toast-amount") {
            if (element.target.getAttribute("id") != "toast-amount") {
                toastAmount.blur();
                if (toastAmount.value != "0.00") {
                    let totalTips = totalDayTipValue.innerText;
                    let toastCash = toastAmount.value;
                    let total = parseFloat(totalTips) + parseFloat(toastCash);
                    total = total.toFixed(2);
                    totalTipValue.innerText = total;
                    let currentDate = document.querySelector(".date-selected-cash").innerText;
                    if (toastAmount.value != cashJSON[currentDate]) {
                        cashJSON[currentDate] = toastAmount.value
                        updateCashJSON();
                    }
                }
            }
        };
    }
}

/**
 * If enter is pressed while the toast cash input is active, unfocus the toast cash input and update the 
 * cash JSON if necessary
 * @param {HTML DOM} element - an HTML object, the toast cash input
 */
function enterCheck(element) {
    if (element.code == "Enter") {
        element.target.blur();
        let totalTips = totalDayTipValue.innerText;
        let toastCash = toastAmount.value;
        let total = parseFloat(totalTips) + parseFloat(toastCash);
        total = total.toFixed(2);
        totalTipValue.innerText = total;

        let currentDate = document.querySelector(".date-selected-cash").innerText;
        cashJSON[currentDate] = toastAmount.value
        updateCashJSON();
    }
}

/**
 * If the toast cash input is clicked, make sure it is editable
 */
function changeDefault() {
    toastAmount.contentEditable = "true";
}

/**
 * Prints all of the dates in the global tip calculator JSON to the cash report dates container
 */
function printDatesToCashReport() {
    let dateActive = "";
    if (document.getElementsByClassName("date-selected-cash").length > 0) { dateActive = document.querySelector(".date-selected-cash").innerText; }

    datesContainer.innerHTML = '';
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
        if (date == dateActive) { html = `<p class="date-item-cash date-selected-cash" onclick="clickedDateCash(this)">${date}</p>`; }
        else { html = `<p class="date-item-cash" onclick="clickedDateCash(this)">${date}</p>`; }
        datesContainer.insertAdjacentHTML("beforeend", html);
    }
}

/**
 * Grabs all of the info for the clicked date from the global json and the cash json and prints it
 * in the cash form
 * @param {HTML DOM} element - an HTML object, the clicked date div
 */
function clickedDateCash(element) {
    lunchTipValue.innerText = "0.00";
    dinnerTipValue.innerText = "0.00";
    totalDayTipValue.innerText = "0.00";
    cashForm.style.display = "flex";

    let unselectAll = document.querySelectorAll(".date-selected-cash");
    for (var i = 0; i < unselectAll.length; i++) { unselectAll[i].classList.remove("date-selected-cash"); }
    element.classList.add("date-selected-cash");

    let date = element.textContent;
    if (date in cashJSON) { toastAmount.value = cashJSON[date]; }
    else { toastAmount.value = "0.00"; }

    let lunchKey = date + "_Lunch";
    let dinnerKey = date + "_Dinner";
    let lunchCash = 0;
    let dinnerCash = 0;
    if (lunchKey in globalJSON) {
        let array = globalJSON[lunchKey];
        for (var i = 0; i < array.length; i++) {
            if (array[i].position == "Manager") {
                if (array[i].cashtips) {
                    lunchCash = array[i].cashtips;
                    lunchTipValue.innerText = lunchCash;
                }
            }
        }
    }
    if (dinnerKey in globalJSON) {
        let array = globalJSON[dinnerKey];
        for (var i = 0; i < array.length; i++) {
            if (array[i].position == "Manager") {
                if (array[i].cashtips) {
                    dinnerCash = array[i].cashtips;
                    dinnerTipValue.innerText = dinnerCash;
                }
            }
        }
    }

    let totalCash = lunchCash + dinnerCash;
    totalCash = totalCash.toFixed(2);
    totalDayTipValue.innerText = totalCash;

    let totalCashAmount = parseFloat(totalCash) + parseFloat(toastAmount.value)
    totalCashAmount = parseFloat(totalCashAmount).toFixed(2);
    totalTipValue.innerText = totalCashAmount;
}

/**
 * Returns the lunch cash tips for a specified date 
 * @param {String} date - a string in the form MM-DD-YYYY
 * @returns lunch cash tips
 */
function getLunchCashTips(date) {
    let key = date + "_Lunch"
    let cash = 0
    if (key in globalJSON) {
        let array = globalJSON[key];
        for (var i = 0; i < array.length; i++) {
            if (array[i].position == "Manager") {
                if (array[i].cashtips) {
                    cash = parseFloat(array[i].cashtips);
                }
            }
        }
    }
    return cash;
}

/**
 * Returns the dinner cash tips for a specified date 
 * @param {String} date - a string in the form MM-DD-YYYY
 * @returns dinner cash tips
 */
 function getDinnerCashTips(date) {
    let key = date + "_Dinner"
    let cash = 0
    if (key in globalJSON) {
        let array = globalJSON[key];
        for (var i = 0; i < array.length; i++) {
            if (array[i].position == "Manager") {
                if (array[i].cashtips) {
                    cash = parseFloat(array[i].cashtips);
                }
            }
        }
    }
    return cash;
}

/**
 * Makes an API call to retrieve the cash JSON
 */
function getCashJSON() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            if (req.readyState == 4 && req.status == 200) {
                cashJSON = JSON.parse(req.responseText);
                printAlert("Cash Logs Retrieved!");
            }
            else {
                printAlert("ERROR: Could not retrieve cash logs. Please check your internet connection.")
            }
        }
    };
    req.open("GET", "https://api.jsonbin.io/v3/b/" + apiCashKey + "/latest", true);
    req.setRequestHeader("X-Master-Key", apiMasterKey);
    req.setRequestHeader("X-Bin-Meta", false);
    if (serverActive) { req.send(); }
}

/**
 * Makes an API call to update the cash JSON
 */
function updateCashJSON() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            if (req.readyState == 4 && req.status == 200) {
                printAlert("Successfully updated cash logs!");
            }
        }
    };
    req.open("PUT", "https://api.jsonbin.io/v3/b/" + apiCashKey, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("X-Master-Key", apiMasterKey);
    req.setRequestHeader("X-Bin-Versioning", "true");
    if (serverActive) { req.send(JSON.stringify(cashJSON)); }
}