const tabTipButton = document.getElementById("tab_tip");
const tabTotalButton = document.getElementById("tab_total");
const editConfigButton = document.getElementById("edit-json-button");
const deleteConfigButton = document.getElementById("delete-json-button");
const editCancelButton = document.getElementById("edit-cancel-json-button");
const editSaveButton = document.getElementById("edit-save-json-button");
const totalButton = document.getElementById("total-calculate-button");
const saveHistoryButton = document.getElementById("save-button-history");
const cancelButton = document.getElementById("cancel-button");
const calculateTotalButton = document.getElementById("calculate-actual-total-button");
const viewHistoryButton = document.getElementById("view-history-button");
const saveTotalButton = document.getElementById("save-button-total");
const checkEdit = document.getElementById("worker-table-history-tbody");
const buttonLunch = document.getElementById("view-lunch-button");
const buttonDinner = document.getElementById("view-dinner-button");
const tabTip = document.getElementById("tip_calculator");
const tabTotal = document.getElementById("total_calculator");
const totalTime = document.getElementById("total-type");
const totalDateRange = document.getElementById("total-week");
const totalTableBody = document.getElementById("worker-table-history-tbody");
const timeOfDayButtons = document.getElementById("lunch-dinner-buttons-container");

tabTipButton.addEventListener("click", openTabTip);
tabTotalButton.addEventListener("click", openTabTotal);
editConfigButton.addEventListener("click", editValue);
deleteConfigButton.addEventListener("click", deleteValue);
editCancelButton.addEventListener("click", cancelEdit);
editSaveButton.addEventListener("click", saveEdit);
totalButton.addEventListener("click", calculateTotal);
saveHistoryButton.addEventListener("click", printHistory)
cancelButton.addEventListener("click", cancelTotal);
calculateTotalButton.addEventListener("click", calculateActualTotal)
viewHistoryButton.addEventListener("click", viewHistory);
saveTotalButton.addEventListener("click", printTotalResults)
checkEdit.addEventListener("input", checkEdited)
buttonLunch.addEventListener("click", getLunchTable);
buttonDinner.addEventListener("click", getDinnerTable);

var calculateTotalClicked = false;
var editedTable = false;

function clearHistory() {
    clearSelectedDates();
    clearManagers();
    totalTableBody.innerHTML = ``;
    document.getElementById("worker-table-history").style.display = 'none';
    document.getElementById("config-buttons").style.display = 'none';
    timeOfDayButtons.style.display = "none";
    let documentScope = document.getElementById("total_calculator");
    let dates = documentScope.querySelectorAll(".date-item");
    for (var i = 0; i < dates.length; i++) {
        dates[i].style.pointerEvents = null;
    }
    document.getElementById("manager-header").innerHTML = "Closing Manager";

}

/**
 * Simply checks if a value in the table was changed
 */
function checkEdited() {
    editedTable = true;
}

/**
 * Prints the total results table as a PDF
 */
function printTotalResults() {
    var doc = new jsPDF();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

    var paras = document.querySelectorAll(".date-add");
    totalArray = []
    let sortDates = [];
    for (var i = 0; i < paras.length; i++) {
        let date = paras[i].textContent;
        sortDates.push(date);
    }
    sortDates.sort();
    let firstDate = sortDates[0];
    let lastDate = sortDates[sortDates.length - 1];
    let str = "Total Tips: " + firstDate + " - " + lastDate

    doc.text(pageWidth / 2, 15, str, { align: 'center' })
    doc.autoTable({
        startY: 20,
        html: '#worker-table-history',
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
        },
    });

    let pdfName = "Total Tips.pdf"
    doc.save(pdfName);
}

/**
 * Resets the table histor container to its default
 */
function viewHistory() {
    clearManagers();

    var addedList = document.querySelectorAll(".date-add");
    for (var i = 0; i < addedList.length; i++) { addedList[i].classList.remove("date-add"); }

    document.getElementById("total-select-msg").style.display = 'none';
    document.getElementById("total-button-container").style.display = 'none';
    document.getElementById("view-history-button-container").style.display = 'none';

    totalButton.style.display = 'inline';
    resetHistoryTable();

    calculateTotalClicked = false;

    let documentScope = document.getElementById("total_calculator");
    let dates = documentScope.querySelectorAll(".date-item");
    for (var i = 0; i < dates.length; i++) { dates[i].style.pointerEvents = null; }
}

/**
 * Prints the total tip array to the total table html object
 */
function totalToTable() {
    let tableBody = document.getElementById("worker-table-history-tbody");
    tableBody.innerHTML = ``;

    document.getElementById("worker-table-history").style.display = 'table';

    for (var i = 0; i < totalArray.length; i++) {
        if (totalArray[i].position == "Manager") { continue; }
        let name = totalArray[i].name;
        let position = totalArray[i].position;
        let workerWage = totalArray[i].wage;
        let points = totalArray[i].points
        let html = `
        <tr>
            <td>${name}</td>
            <td>${position}</td>
            <td>${workerWage}</td>
            <td>${points}</td>
        </tr>`;
        tableBody.insertAdjacentHTML('beforeend', html);
    }
}

/**
 * Calculates the total of all of the selected dates' tip history 
 */
function calculateActualTotal() {
    clearManagers();
    document.getElementById("history-list").removeEventListener('click', handleClick);

    var paras = document.querySelectorAll(".date-add");
    totalArray = []
    let sortDates = [];
    for (var i = 0; i < paras.length; i++) {
        let date = paras[i].textContent;
        sortDates.push(date);
        let dinnerKey = date + "_Dinner"
        let lunchKey = date + "_Lunch"
        let dateArray = []
        if (lunchKey in globalJSON) {
            let lunchArray = globalJSON[lunchKey];
            dateArray = dateArray.concat(lunchArray);
        }
        if (dinnerKey in globalJSON) {
            let dinnerArray = globalJSON[dinnerKey];
            dateArray = dateArray.concat(dinnerArray)
        }

        /* Loop through the selected date's worker array */
        for (var j = 0; j < dateArray.length; j++) {
            if (dateArray[j].position == "Manager") { continue; }
            let workerName = dateArray[j].name;
            let inArray = false;
            let index = 0;

            /* Check if the worker is already in the total array */
            for (var k = 0; k < totalArray.length; k++) {
                if (workerName == totalArray[k].name) {
                    inArray = true;
                    index = k;
                }
            }

            if (inArray == false) {
                let workerPos = dateArray[j].position;
                let workerWage = dateArray[j].wage;
                let workerPoints = dateArray[j].points;
                const workerInfo = { name: workerName, position: workerPos, wage: workerWage, points: workerPoints };
                totalArray.push(workerInfo);
            }
            else {
                let currentWage = totalArray[index].wage;
                let currentPoints = totalArray[index].points;
                let wage = parseFloat(currentWage) + parseFloat(dateArray[j].wage);
                let points = 0;
                if (dateArray[j].position != "Dishwasher") {
                    points = parseFloat(currentPoints) + parseFloat(dateArray[j].points);
                    /* check for decimal place */
                    let stringPoints = points.toString();
                    if (stringPoints.includes(".")) {
                        let decimalPoints = stringPoints.split(".");
                        decimalPoints = decimalPoints[1];
                        if (decimalPoints.length > 3) {
                            points = points.toFixed(3);
                        }
                    }
                }
                else {
                    points = "-";
                }
                totalArray[index].wage = wage;
                totalArray[index].points = points
            }
        }
        totalToTable();
    }

    sortDates.sort();
    let last = sortDates.length - 1;
    document.getElementById("total-select-msg").textContent = "Total Tips: " + sortDates[0] + " - " + sortDates[last];
    document.getElementById("total-button-container").style.display = 'none';
    document.getElementById("view-history-button-container").style.display = 'flex';
    timeOfDayButtons.style.display = "none";
    let documentScope = document.getElementById("total_calculator");
    let dates = documentScope.querySelectorAll(".date-item");
    for (var i = 0; i < dates.length; i++) { dates[i].style.pointerEvents = "none"; }
}

/**
 * Clears the tip history's html container
 */
function cancelTotal() {
    timeOfDayButtons.style.display = "none";
    clearManagers();

    totalButton.style.display = 'inline';
    document.getElementById("total-select-msg").style.display = 'none';
    document.getElementById("total-button-container").style.display = 'none';
    document.getElementById("history-list").removeEventListener("click", handleClick);

    var paras = document.querySelectorAll(".date-add");
    for (var i = 0; i < paras.length; i++) { paras[i].classList.remove("date-add"); }

    resetHistoryTable();

    calculateTotalClicked = false;
}

/**
 * Opens the tip calculator tab when clicked and highlights it
 */
function openTabTip() {
    cashReports.style.display = "none";
    tabTotal.style.display = "none";
    tabTip.style.display = 'flex';

    let activeTabs = document.querySelectorAll(".tab.active");
    for (var i = 0; i < activeTabs.length; i++) { activeTabs[i].classList.remove("active"); }
    tabTipButton.classList.add("active");
}

/**
 * Opens the tip history tab when clicked and highlights it
 */
function openTabTotal() {
    cashReports.style.display = "none";
    tabTip.style.display = 'none';
    tabTotal.style.display = 'flex';

    let activeTabs = document.querySelectorAll(".tab.active");
    for (var i = 0; i < activeTabs.length; i++) { activeTabs[i].classList.remove("active"); }
    tabTotalButton.classList.add("active");
}

/**
 * Prints the worker's tip history for the date that has been clicked
 * @param {object} element - the month as a numerical value
 */
function clickedDate(element) {
    timeOfDayButtons.style.display = "flex";

    var paras = document.getElementsByClassName("date-selected");
    for (var i = 0; i < paras.length; i++) { paras[0].classList.remove("date-selected"); }

    clearManagers();
    cancelEdit();

    let date = element.textContent;
    element.classList.add("date-selected");
    let lunchKey = date + "_Lunch";
    let dinnerKey = date + "_Dinner";
    let array = []
    let dinnerCursor = document.getElementById("dinner-cursor-wrapper");
    let lunchCursor = document.getElementById("lunch-cursor-wrapper");

    /* both keys exist */
    if (lunchKey in globalJSON && dinnerKey in globalJSON) {
        buttonLunch.classList.remove("inactive");
        buttonLunch.classList.add("selected");

        buttonDinner.classList.remove("inactive");
        buttonDinner.classList.remove("selected");

        lunchCursor.style.cursor = null;
        dinnerCursor.style.cursor = null;

        array = globalJSON[lunchKey]
    }

    /* only lunch key exists */
    else if (lunchKey in globalJSON && (!(dinnerKey in globalJSON))) {
        buttonLunch.classList.remove("inactive");
        buttonLunch.classList.add("selected");

        buttonDinner.classList.add("inactive");
        buttonDinner.classList.remove("selected");

        lunchCursor.style.cursor = null;
        dinnerCursor.style.cursor = "not-allowed";

        array = globalJSON[lunchKey]
    }

    /* only dinner key exists */
    else if (dinnerKey in globalJSON && (!(lunchKey in globalJSON))) {
        buttonDinner.classList.remove("inactive");
        buttonDinner.classList.add("selected");

        buttonLunch.classList.add("inactive");
        buttonLunch.classList.remove("selected");

        lunchCursor.style.cursor = "not-allowed";
        dinnerCursor.style.cursor = null;

        array = globalJSON[dinnerKey];
    }

    document.getElementById("worker-table-history").style.display = 'table';

    if (!calculateTotalClicked) {
        document.getElementById("config-buttons").style.display = 'inline';
        document.getElementById("save-history-button-container").style.display = 'flex';
    }

    printTableToHistory(array);
}

/**
 * Prints the corresponding lunch table based on the date selected
 */
function getLunchTable() {
    let dateElement = document.querySelector(".date-selected");
    let key = dateElement.textContent + "_Lunch";
    let array = globalJSON[key];
    printTableToHistory(array);

    buttonDinner.classList.remove("selected");
    buttonLunch.classList.add("selected");
}

/**
 * Prints the corresponding dinner table based on the date selected
 */
function getDinnerTable() {
    let dateElement = document.querySelector(".date-selected");
    let key = dateElement.textContent + "_Dinner";
    let array = globalJSON[key];
    printTableToHistory(array);

    buttonLunch.classList.remove("selected");
    buttonDinner.classList.add("selected");
}

/**
 * Prints a table of the worker information in the history container
 * @param {Array} array - the array of workers
 */
function printTableToHistory(array) {
    let tableBody = document.getElementById("worker-table-history-tbody");
    tableBody.innerHTML = '';
    for (var i = 0; i < array.length; i++) {
        if (array[i].position == "Manager") {
            let managerContainer = document.getElementById("manager-container");
            managerContainer.style.display = 'flex';
            let managerText = document.getElementById("manager-text")
            managerText.innerHTML = array[i].name;
        }
        else {
            let name = array[i].name;
            let position = array[i].position;
            let workerWage = array[i].wage;
            let points = array[i].points
            let html = ``;
            if (array[i].late) {
                html = `
                <tr>
                    <td>${name}</td>
                    <td>${position}</td>
                    <td>${workerWage}</td>
                    <td>
                        <div class="late-container"> 
                            <div class="worker-hours">${points}</div> 
                                <div class="table-icon-container">
                                    <img class="late-icon-table active" title="Worker was late, -1 Point" src="/icons/delay-icon-solid.svg"> 
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>`;
            }
            else {
                html = `
                <tr>
                    <td>${name}</td>
                    <td>${position}</td>
                    <td>${workerWage}</td>
                    <td>${points}</td>
                </tr>`;
            }
            tableBody.insertAdjacentHTML('beforeend', html);
        }
    }


    const tableResultsSize = document.getElementById("worker-table-history-tbody").rows.length;
    if (tableResultsSize < 9) {
        for (var i = tableResultsSize; i < 8; i++) {
            let html = `       
            <tr class="empty-row-total">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>`;
            document.getElementById("worker-table-history-tbody").insertAdjacentHTML("beforeend", html);
        }
    }
    else {
        let lateIcons = tableBody.querySelectorAll(".table-icon-container");
        for (var i = 0; i < lateIcons.length; i++) {
            lateIcons[i].classList.add("offset");
        }
    }
}

/**
 * Clears the manager html object
 */
function clearManagers() {
    document.getElementById("manager-container").style.display = 'none';
    document.getElementById("manager-text").innerHTML = '';
}

/**
 * Resets a table if an edit was cancelled
 */
function cancelEdit() {
    editConfigButton.style.display = 'inline';
    deleteConfigButton.style.display = 'inline';
    editCancelButton.style.display = 'none';
    editSaveButton.style.display = 'none';
    let table = document.getElementById("worker-table-history-tbody");
    table.contentEditable = "false";
    table.style.border = null;
}

/**
 * Allows a table to be edited and adds proper styling
 */
function editValue() {
    let table = document.getElementById("worker-table-history-tbody");
    for (var i = 0, row; row = table.rows[i]; i++) {
        for (var j = 0, col; col = row.cells[j]; j++) {
            if (j == 0) {
                row.cells[j].contentEditable = "true";
            }
        }
    }
    table.style.border = "solid 2px black";

    editConfigButton.style.display = 'none';
    deleteConfigButton.style.display = 'none';

    editCancelButton.style.display = 'inline';
    editSaveButton.style.display = 'inline';
}

/**
 * Deletes a key from the the json object
 */
function deleteValue() {
    var paras = document.querySelectorAll(".date-selected");
    let dateSelected = paras[0].innerText;

    if (confirm("Are you sure you want to delete this tip report?")) {
        let key = dateSelected + "_" + findActiveKey();
        delete globalJSON[key]
        updateJSON();
        timeOfDayButtons.style.display = "none";
        resetHistoryTable();
        clearManagers();
    }
}

/**
 * Saves any changes to a table to the json object
 */
function saveEdit() {
    if (editedTable) {
        workerArray = []
        const table = document.getElementById("worker-table-history");

        var paras = document.querySelectorAll(".date-selected");
        let dateSelected = paras[0].innerText;
        let key = dateSelected + "_" + findActiveKey();
        let array = globalJSON[key];

        /* Loop and grab all the data from the worker table row by row, overwriting the original array */
        for (var i = 1, row; row = table.rows[i]; i++) {
            if (!(row.classList.contains("empty-row-total"))) {
                let workerIndex = i - 1;
                let workerName = row.cells[0].innerText;
                workerName = workerName.trim();
                array[workerIndex].name = workerName;
            }
        }

        globalJSON[key] = array;
        checkUpdateRequired();
    }
    cancelEdit();
}

/**
 * Finds the current time for a selected date, either lunch or dinner
 * @returns {String} - either lunch or dinner
 */
function findActiveKey() {
    let activeButton = document.querySelector(".form-button.time.selected");
    return activeButton.value;
}

/**
* Starts the process to calculate the total by allowing the user to select multiple dates
*/
function calculateTotal() {
    timeOfDayButtons.style.display = "none";
    calculateTotalClicked = true;
    clearManagers();
    cancelEdit();

    totalButton.style.display = 'none';
    let msg = document.getElementById("total-select-msg");
    msg.textContent = 'Select dates to add together';
    msg.style.display = 'inline';

    document.getElementById("config-buttons").style.display = 'none';
    document.getElementById("save-history-button-container").style.display = 'none';
    document.getElementById("total-button-container").style.display = 'flex';

    var paras = document.getElementsByClassName("date-selected");
    for (var i = 0; i < paras.length; i++) { paras[0].classList.remove("date-selected"); }

    document.getElementById("history-list").addEventListener('click', handleClick);
    resetHistoryTable();
}

/**
* Highlights multiple dates that are selected so that their worker's tips can be added up together
* @param {object} element - an html object, usually a date div
*/
function handleClick(element) {
    if (element.target.classList.contains("date-item")) {
        if (!(element.target.classList.contains('date-add'))) { element.target.classList.add('date-add'); }
        else { element.target.classList.remove("date-add"); }

        if (element.target.classList.contains("date-selected")) { element.target.classList.remove("date-selected") }
    }

    /* Prints the lunch and dinner tables combined */
    let array = [];
    let totalArray = [];
    let key = element.target.innerText + "_Lunch";
    if (key in globalJSON) {
        array = globalJSON[key];
    }
    key = element.target.innerText + "_Dinner";
    if (key in globalJSON) {
        array = array.concat(globalJSON[key]);
    }

    for (var i = 0; i < array.length; i++) {
        let currName = array[i].name;
        let currPos = array[i].position;
        let currWage = array[i].wage;
        let currPoints = array[i].points;
        if (array[i].position == "Manager") { continue; }

        let inArray = false;
        let inArrayIndex = 0;
        for (var j = 0; j < totalArray.length; j++) {
            if (currName == totalArray[j].name && currPos == totalArray[j].position) {
                inArray = true;
                inArrayIndex = j;
            }
        }
        if (inArray) {
            let updatedPoints = parseFloat(totalArray[inArrayIndex].points) + parseFloat(currPoints);
            let updatedWage = parseFloat(totalArray[inArrayIndex].wage) + parseFloat(currWage);
            totalArray[inArrayIndex].points = updatedPoints;
            totalArray[inArrayIndex].wage = updatedWage;
        }
        else {
            const workerInfo = { name: currName, position: currPos, wage: currWage, points: currPoints };
            totalArray.push(workerInfo);
        }
    }
    printTableToHistory(totalArray);

    timeOfDayButtons.style.display = "none";
    document.getElementById("manager-container").style.display = 'none';
}

/**
* Resets and hide the tip history table
*/
function resetHistoryTable() {
    document.getElementById("worker-table-history").style.display = 'none';
    document.getElementById("worker-table-history-tbody").innerHTML = ``;
    document.getElementById("config-buttons").style.display = 'none';
}

/**
 * Saves the date selected's table as a pdf
 */
function printHistory() {
    var doc = new jsPDF();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    let date = document.querySelector(".date-selected").innerText
    date = date.replace(" ", "-");

    let splitDate = date.split("-");
    let numMonth = splitDate[0];

    let month = getMonth(numMonth);
    let day = splitDate[1];
    let year = splitDate[2];
    let time = document.querySelector(".form-button.time.selected").value;

    let dateTimeString = month + " " + day + ", " + year + " - " + time;

    let manager = document.getElementById("manager-text").innerText;
    let managerString = "Closing Manager: " + manager

    /* doc.text takes x, y, string parameters */
    doc.text(pageWidth / 2, 15, dateTimeString, { align: 'center' })
    doc.setFontSize(12);
    doc.text(pageWidth / 2, 25, managerString, { align: 'center' })

    doc.autoTable({
        startY: 30,
        html: '#worker-table-history',
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

    let strNumber = numMonth + "." + day + "." + year;

    let currentTime = document.querySelector(".form-button.time.selected").value;
    let pdfName = strNumber + " " + currentTime + " Tips.pdf";
    doc.save(pdfName);
}