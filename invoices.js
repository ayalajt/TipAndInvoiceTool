const invoice_submitPage = document.getElementById("invoice_submit-invoice-page");
const invoice_closeAlert = document.getElementById("invoice_close-alert");
const invoice_buttonSubmit = document.getElementById("invoice_submit-button");
const invoice_buttonEditSales = document.getElementById("invoice_edit-sales");
const invoice_buttonCancelSales = document.getElementById("invoice_cancel-sales");
const invoice_buttonSaveSales = document.getElementById("invoice_save-sales");
const invoice_buttonNewInvoice = document.getElementById("invoice_new-invoice-button");
const invoice_buttonSelectProvider = document.getElementById("invoice_select-provider-button");
const invoice_buttonCancel = document.getElementById("invoice_cancel-invoice-button");
const invoice_buttonCalculateTotal = document.getElementById("invoice_calculate-total-button");
const invoice_buttonCalculateTotalCustom = document.getElementById("invoice_calculate-total-button-custom");
const invoice_buttonClearTotalCustom = document.getElementById("invoice_clear-total-button-custom");
const invoice_buttonClearTotal = document.getElementById("invoice_clear-total-button");
const invoice_buttonSelectTotal = document.getElementById("invoice_select-total-button");
const invoice_buttonClearSelectTotal = document.getElementById("invoice_clear-total-button-select");
const invoice_buttonTodaysDate = document.getElementById("invoice_today-date-button");
const invoice_buttonCalculateSelectedDates = document.getElementById("invoice_calculate-total-button-select");
const invoice_inputSalesValue = document.getElementById("invoice_sales-value");
const invoice_inputDateValue = document.getElementById("invoice_input-date");
const invoice_inputProviderValue = document.getElementById("invoice_provider-dropdown");
const invoice_inputCostValue = document.getElementById("invoice_input-cost");
const invoice_inputTypeValue = document.getElementById("invoice_type-dropdown-input");
const invoice_inputTypeCustom = document.getElementById("invoice_type-dropdown-input-custom");
const invoice_inputTypeOptionsCustom = document.getElementById("invoice_type-dropdown-options-custom");
const invoice_inputStartDateCustomValue = document.getElementById("invoice_custom-start-date");
const invoice_inputEndDateCustomValue = document.getElementById("invoice_custom-end-date");
const invoice_dropdownProvider = document.getElementById("invoice_provider-options");
const invoice_dropdownDelivery = document.getElementById("invoice_delivery-dropdown-input");
const invoice_dropdownDeliveryOptions = document.getElementById("invoice_delivery-dropdown-options");
const invoice_dropdownTypeOptions = document.getElementById("invoice_type-dropdown-options");
const invoice_dropdownTime = document.getElementById("invoice_time-dropdown-input");
const invoice_dropdownTimeOptions = document.getElementById("invoice_time-dropdown-options");
const invoice_iconDeleteKey = document.getElementById("invoice_delete-invoices-icon");
const invoice_iconSaveTotal = document.getElementById("invoice_print-total-icon");
const invoice_iconSaveIndividual = document.getElementById("invoice_print-invoices-icon");
const invoice_tableTotal = document.getElementById("invoice_invoice-total-table");
const invoice_tableIndividual = document.getElementById("invoice_invoice-table");
const invoice_valueTypeCustom = document.getElementById("invoice_input-type-custom");
const invoice_valueTime = document.getElementById("invoice_input-time");
const invoice_valueType = document.getElementById("invoice_input-type");
const invoice_valueDelivery = document.getElementById("invoice_input-delivery");
const invoice_messageAlert = document.getElementById("invoice_alert-msg");
const invoice_containerDates = document.getElementById("invoice_dates-container");
const invoice_tableIndividualBody = document.getElementById("invoice_invoice-tbody");
const invoice_containerCost = document.getElementById("invoice_invoices-cost-container");
const invoice_valueCost = document.getElementById("invoice_cost-value");
const invoice_valueDifference = document.getElementById("invoice_difference-value");
const invoice_tableTotalBody = document.getElementById("invoice_invoice-total-tbody");
const invoice_containerConfigButtons = document.getElementById("invoice_edit-sales-button-container");
const invoice_containerConfigSalesButtons = document.getElementById("invoice_cancel-save-sales-container");
const invoice_containerMessage = document.getElementById("invoice_total-select-msg");
const invoice_containerTotalButtons = document.getElementById("invoice_total-button-container");
const invoice_headerCost = document.getElementById("invoice_cost-header");
const invoice_headerSales = document.getElementById("invoice_sales-header");
const invoice_headerDifference = document.getElementById("invoice_difference-header");
const invoice_containerDefaultOptions = document.getElementById("invoice_default-options-buttons");
const invoice_containerClearOptions = document.getElementById("invoice_clear-options-button");
const invoice_rowDefaultOptions = document.getElementById("invoice_default-options-row");
const invoice_containerCustomOptions = document.getElementById("invoice_custom-total-options");
const invoice_containerCustomOptionsButtons = document.getElementById("invoice_custom-options-buttons");
const invoice_containerSelectOptions = document.getElementById("invoice_select-options-buttons");

document.addEventListener("click", invoice_closeDropdowns);
invoice_submitPage.addEventListener("click", invoice_checkClosingPopup);
invoice_closeAlert.addEventListener("click", invoice_closeAlertMsg);
invoice_inputSalesValue.addEventListener("keypress", invoice_updateSalesEnter);
invoice_buttonTodaysDate.addEventListener("click", invoice_setTodaysDate);
invoice_buttonCalculateSelectedDates.addEventListener("click", invoice_calculateSelected);
invoice_buttonSubmit.addEventListener("click", invoice_submitInvoice);
invoice_buttonCalculateTotal.addEventListener("click", invoice_calculateTotalInvoices);
invoice_buttonCalculateTotalCustom.addEventListener("click", invoice_calculateCustomWeek);
invoice_buttonClearTotal.addEventListener("click", invoice_resetTotal);
invoice_buttonClearTotalCustom.addEventListener("click", invoice_resetTotal);
invoice_buttonEditSales.addEventListener("click", invoice_editSales)
invoice_buttonCancelSales.addEventListener("click", invoice_cancelSales);
invoice_buttonSaveSales.addEventListener("click", invoice_updateSales);
invoice_buttonSelectTotal.addEventListener("click", invoice_selectTotal);
invoice_buttonClearSelectTotal.addEventListener("click", invoice_resetTotal)
invoice_buttonNewInvoice.addEventListener("click", invoice_openPopup);
invoice_buttonSelectProvider.addEventListener("click", invoice_openProviders);
invoice_buttonCancel.addEventListener("click", invoice_closePopup);
invoice_inputDateValue.addEventListener("keydown", invoice_checkBackspace);
invoice_inputDateValue.addEventListener("input", invoice_addHyphen);
invoice_inputDateValue.addEventListener("click", invoice_changeInput);
invoice_inputProviderValue.addEventListener("click", invoice_changeInput);
invoice_inputCostValue.addEventListener("click", invoice_changeInput);
invoice_inputTypeValue.addEventListener("click", invoice_toggleTypeOptions);
invoice_inputTypeCustom.addEventListener("click", invoice_toggleTypeOptionsCustom);
invoice_inputTypeOptionsCustom.addEventListener("click", invoice_changeTypeInputCustom);
invoice_inputStartDateCustomValue.addEventListener("click", invoice_changeInput);
invoice_inputEndDateCustomValue.addEventListener("click", invoice_changeInput);
invoice_inputStartDateCustomValue.addEventListener("input", invoice_addHyphen);
invoice_inputEndDateCustomValue.addEventListener("input", invoice_addHyphen);
invoice_dropdownProvider.addEventListener("click", invoice_changeProvider);
invoice_dropdownDelivery.addEventListener("click", invoice_toggleDeliveryOptions);
invoice_dropdownDeliveryOptions.addEventListener("click", invoice_changeDeliveryInput);
invoice_dropdownTypeOptions.addEventListener("click", invoice_changeTypeInput);
invoice_dropdownTime.addEventListener("click", invoice_toggleTimeOptions);
invoice_dropdownTimeOptions.addEventListener("click", invoice_changeTimeInput);
invoice_iconSaveTotal.addEventListener("click", invoice_savePDF);
invoice_iconDeleteKey.addEventListener("click", invoice_deleteDateInvoices);
invoice_iconSaveIndividual.addEventListener("click", invoice_saveInvoicePDF);
invoice_tableTotal.addEventListener("mouseover", function () { invoice_iconSaveTotal.style.display = "flex"; });
invoice_tableTotal.addEventListener("mouseleave", function () { invoice_iconSaveTotal.style.display = "none"; });
invoice_tableIndividual.addEventListener("mouseover", function () {
    invoice_iconSaveIndividual.style.display = "flex";
    invoice_iconDeleteKey.style.display = "flex";
});
invoice_tableIndividual.addEventListener("mouseleave", function () {
    invoice_iconSaveIndividual.style.display = "none";
    invoice_iconDeleteKey.style.display = "none";
});

var invoice_globalJSON = {}
var invoice_oldSales = "";
var invoice_serverActive = true;
var invoice_backspacePressed = false;
var invoice_startingWeek = "";
var invoice_endingWeek = "";
var invoice_datesSelected = false; 
var invoice_JSONRetrieved = false;

window.jsPDF = window.jspdf.jsPDF;

/**
 * Deletes all invoices from a date in the JSON
 */
function invoice_deleteDateInvoices() {
    if (document.querySelector(".invoice_date-selected")) {
        if (confirm("WARNING: This will delete ALL invoices for the selected date. Are you sure?")) {
            let date = document.querySelector(".invoice_date-selected").innerText;
            delete invoice_globalJSON[date];
            invoice_updateJSON();
            invoice_drawDates();
            let documentScope = document.getElementById("invoice_tool");
            let newDate = documentScope.querySelectorAll(".date-item");
            let newDateString = newDate[newDate.length - 1].innerText;
            invoice_clickedDatePassed(newDateString);
            invoice_reselectDate(newDateString);
        }
    }
}

/**
 * Saves the selected day's invoices as a PDF
 */
function invoice_saveInvoicePDF() {
    var doc = new jsPDF();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    let date = document.querySelector(".invoice_date-selected");

    if (date) {
        date = date.innerText;
        let difference = invoice_valueDifference.innerText;
        let cost = invoice_valueCost.innerText;
        let sales = invoice_inputSalesValue.innerText;
        let dateString = date + " Invoices"
        if (parseFloat(difference) < 0) {
            difference = difference * -1
            difference = "-$" + difference
        }
        else { difference = "$" + difference }
        let csd = "Cost: $" + cost + " | Sales: $" + sales + " | Difference: " + difference;
        doc.text(pageWidth / 2, 15, dateString, { align: 'center' })
        doc.setFontSize(12);
        doc.text(pageWidth / 2, 23, csd, { align: 'center' });

        doc.autoTable({
            startY: 27,
            html: '#invoice_invoice-table',
            theme: 'striped',
            headStyles: {
                halign: 'left',
                fillColor: [71, 71, 71],
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
        let pdfName = dateString + ".pdf"
        doc.save(pdfName);
    }
}

/**
 * Saves the total invoices from a selected date range as a PDF
 */
function invoice_savePDF() {
    var doc = new jsPDF();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    /* doc.text takes x, y, string parameters */
    doc.text(pageWidth / 2, 15, "Invoice Total", { align: 'center' })
    doc.setFontSize(12);
    if (invoice_datesSelected) {
        doc.text(pageWidth / 2, 23, "Selected Dates", { align: 'center' })
    }
    else {
        doc.text(pageWidth / 2, 23, invoice_startingWeek + " through " + invoice_endingWeek, { align: 'center' })
    }

    let difference = invoice_valueDifference.innerText;
    let cost = invoice_valueCost.innerText;
    let sales = invoice_inputSalesValue.innerText;
    if (parseFloat(difference) < 0) {
        difference = difference * -1
        difference = "-$" + difference
    }
    else { difference = "$" + difference }
    let csd = "Cost: $" + cost + " | Sales: $" + sales + " | Difference: " + difference;
    doc.text(pageWidth / 2, 30, csd, { align: 'center' });

    doc.autoTable({
        startY: 35,
        html: '#invoice_invoice-total-table',
        theme: 'striped',
        headStyles: {
            halign: 'left',
            fillColor: [71, 71, 71],
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
    let pdfName = "Invoice Total.pdf"
    doc.save(pdfName);
}

/**
 * Toggles the invoice type dropdown
 */
function invoice_toggleTypeOptionsCustom() {
    if (invoice_inputTypeOptionsCustom.style.display == "none") { invoice_inputTypeOptionsCustom.style.display = "flex"; }
    else if (invoice_inputTypeOptionsCustom.style.display == "flex") { invoice_inputTypeOptionsCustom.style.display = "none"; }
    else { invoice_inputTypeOptionsCustom.style.display = "flex"; }
}

/**
 * Changes the invoice type to the selected option
 * @param {HTML DOM} element - The type option selected
 */
function invoice_changeTypeInputCustom(element) {
    let option = element.target.textContent.trim();
    invoice_valueTypeCustom.innerText = option;
    invoice_inputTypeOptionsCustom.style.display = "none";
}

/**
 * Toggles the time of week options dropdown 
 */
function invoice_toggleTimeOptions() {
    if (invoice_dropdownTimeOptions.style.display == "none") { invoice_dropdownTimeOptions.style.display = "flex"; }
    else if (invoice_dropdownTimeOptions.style.display == "flex") { invoice_dropdownTimeOptions.style.display = "none"; }
    else { invoice_dropdownTimeOptions.style.display = "flex"; }
}

/**
 * Toggles the type options dropdown
 */
 function invoice_toggleTypeOptions() {
    if (invoice_dropdownTypeOptions.style.display == "none") { invoice_dropdownTypeOptions.style.display = "flex"; }
    else if (invoice_dropdownTypeOptions.style.display == "flex") { invoice_dropdownTypeOptions.style.display = "none"; }
    else { invoice_dropdownTypeOptions.style.display = "flex"; }
}

/**
 * Toggles the delivery options dropdown
 */
function invoice_toggleDeliveryOptions() {
    if (invoice_dropdownDeliveryOptions.style.display == "none") { invoice_dropdownDeliveryOptions.style.display = "flex"; }
    else if (invoice_dropdownDeliveryOptions.style.display == "flex") { invoice_dropdownDeliveryOptions.style.display = "none"; }
    else { invoice_dropdownDeliveryOptions.style.display = "flex"; }
}

/**
 * Toggles the provider options dropdown
 */
function invoice_openProviders() {
    if (invoice_dropdownProvider.style.display == "none") { invoice_dropdownProvider.style.display = "flex"; }
    else if (invoice_dropdownProvider.style.display == "flex") { invoice_dropdownProvider.style.display = "none"; }
    else { invoice_dropdownProvider.style.display = "flex"; }
}

/**
 * Changes the time of week input when an option is clicked
 * @param {HTML DOM} element  - the time of the week option selected
 */
function invoice_changeTimeInput(element) {
    let option = element.target.textContent.trim();
    invoice_valueTime.innerText = option;
    invoice_dropdownTypeOptions.style.display = "none";
}

/**
 * Changes the invoice type to the selected option
 * @param {HTML DOM} element - The type option selected
 */
function invoice_changeTypeInput(element) {
    let option = element.target.textContent.trim();
    invoice_valueType.innerText = option;
    invoice_valueType.style.color = "black";
    invoice_dropdownTypeOptions.style.display = "none";
}

/**
 * Changes the delivery input to the option selected
 * @param {HTML DOM} element - the delivery option selected
 */
function invoice_changeDeliveryInput(element) {
    let option = element.target.textContent.trim();
    invoice_valueDelivery.innerText = option;
    invoice_valueDelivery.style.color = "black";
    invoice_dropdownDeliveryOptions.style.display = "none";
}

/**
 * Changes the provider input to the option selected
 * @param {HTML DOM} element - the delivery option selected
 */
function invoice_changeProvider(element) {
    let text = element.target.textContent;
    text = text.trim();
    invoice_inputProviderValue.value = text;
    invoice_inputProviderValue.style.color = "black";
    invoice_dropdownProvider.style.display = "none";
}

/**
 * If the user clicks anywhere but the popup, close it
 * @param {HTML DOM} element - The element where the user clicked
 */
function invoice_checkClosingPopup(element) {
    if (element.target.classList.contains("popup-bg")) { invoice_closePopup(); }
}

/**
 * Checks which dropdown to close depending on where the user clicked
 * @param {HTML DOM} element - The element where the user clicked
 */
function invoice_closeDropdowns(element) {
    if (element.target.parentElement) {
        let parent = element.target.parentElement;
        if (parent.id != "invoice_provider-options" && parent.id != "invoice_select-provider-button" && parent.id != "invoice_dropdown-side-button-container") {
            invoice_dropdownProvider.style.display = "none";
        }
        if (parent.id != "invoice_delivery-dropdown-container"
            && parent.id != "invoice_delivery-dropdown-input"
            && parent.id != "invoice_delivery-dropdown-options") {
            invoice_dropdownDeliveryOptions.style.display = "none";
        }
        if (parent.id != "invoice_type-dropdown-input"
            && parent.id != "invoice_type-dropdown-container") {
            invoice_dropdownTypeOptions.style.display = "none";
        }
        if (parent.id != "invoice_time-dropdown-input"
            && parent.id != "invoice_time-dropdown-container") {
            invoice_dropdownTimeOptions.style.display = "none";
        }
        if (parent.id != "invoice_type-dropdown-input-custom"
            && parent.id != "invoice_type-dropdown-container-custom") {
            invoice_inputTypeOptionsCustom.style.display = "none";
        }
    }
}

/**
 * Sets the date to today if the user clicks the date icon
 */
function invoice_setTodaysDate() {
    const current = moment().local()
    let date = current.format("MM-DD-YYYY");
    invoice_inputDateValue.style.color = "black";
    invoice_inputDateValue.value = date;
}

/**
 * Automatically clears an input if it has a default value
 * @param {HTML DOM} element - The input field to be checked
 */
function invoice_changeInput(element) {
    element.target.style.color = "black";
    if (element.target.value == "Name") { element.target.value = ""; }
    else if (element.target.value == "MM-DD-YYYY") { element.target.value = ""; }
    else if (element.target.value == "0.00") { element.target.value = ""; }
}

/**
 * Checks to see if the user pressed backspace
 * @param {HTML DOM} element - the user's key presses
 */
function invoice_checkBackspace(element) {
    if (element.key == "Backspace") { invoice_backspacePressed = true }
    else { invoice_backspacePressed = false; }
}

/**
 * Automatically adds a hyphen to a date depending on certain conditions
 * @param {HTML DOM} element - the user's key presses
 */
function invoice_addHyphen(element) {
    if (invoice_backspacePressed == false) {
        if (parseInt(element.target.value) >= 2 && element.target.value.length == 1 && !isNaN(element.target.value)) {
            element.target.value += '-';
        }
        else if (element.target.value.length == 2 && !isNaN(element.target.value) && parseInt(element.target.value) <= 12) {
            element.target.value += '-';
        }
        if (element.target.value.length == 4) {
            let day = element.target.value;
            day = day[2] + day[3]
            if (!isNaN(day) && (parseInt(day) >= 1 && parseInt(day) <= 31)) { element.target.value += '-'; }
        }
        else if (element.target.value.length == 5) {
            let day = element.target.value;
            day = day[3] + day[4]
            if (!isNaN(day) && (parseInt(day) >= 1 && parseInt(day) <= 31)) { element.target.value += '-'; }
        }
    }
}

/**
 * Closes the popup and resets all fields to their default value
 */
function invoice_closePopup() {
    invoice_inputDateValue.value = "MM-DD-YYYY";
    invoice_valueDelivery.innerText = "Select";
    invoice_inputProviderValue.value = "Name";
    invoice_inputCostValue.value = "0.00";
    let inputs = document.querySelectorAll(".input-invoice-value");
    for (var i = 0; i < inputs.length; i++) { inputs[i].style.color = "gray"; }
    invoice_submitPage.style.display = "none";
}

/**
 * Opens the invoice popup
 */
function invoice_openPopup() {
    invoice_submitPage.style.display = "flex";
}

/**
 * Retrieves the server's JSON that contains the invoice information
 */
function invoice_getJSON() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            if (req.readyState == 4 && req.status == 200) { invoice_JSONToArray(JSON.parse(req.responseText)); }
            else { console.log("ERROR with request"); }
        }
    };
    req.open("GET", "https://api.jsonbin.io/v3/b/" + invoiceApiKey + "/latest", true);
    req.setRequestHeader("X-Master-Key", apiMasterKey);
    req.setRequestHeader("X-Bin-Meta", false);
    req.send();
}

/**
 * Updates the server's JSON when any invoice is changed
 */
function invoice_updateJSON() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            if (req.readyState == 4 && req.status == 200) {
                invoice_messageAlert.style.display = 'flex';
                setTimeout(() => { invoice_messageAlert.style.display = 'none'; }, 5000);
            }
        }
    };
    req.open("PUT", "https://api.jsonbin.io/v3/b/" + invoiceApiKey, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("X-Master-Key", apiMasterKey);
    req.setRequestHeader("X-Bin-Versioning", "true");
    req.send(JSON.stringify(invoice_globalJSON));
}

/**
 * Converts the retrieved json to a local dictionary array
 * @param {Dictionary} json 
 */
function invoice_JSONToArray(json) {
    Object.entries(json).forEach((entry) => {
        const [key, value] = entry
        if (!(key in invoice_globalJSON)) { invoice_globalJSON[key] = value }
    });
    invoice_drawDates();
}

/**
 * Adds an invoice a user has inputted after verifying it is valid
 */
function invoice_submitInvoice() {
    let date = invoice_inputDateValue.value;
    let deliveryType = invoice_valueDelivery.innerText;
    let providerType = invoice_inputProviderValue.value;
    let cost = invoice_inputCostValue.value;
    if (!(invoice_validateDate(date))) { alert("ERROR: Please enter a valid date in the format MM-DD-YYYY"); }
    else if (providerType == "Name") { alert("ERROR: Please select a provider"); }
    else if (deliveryType == "Select") { alert("ERROR: Please select a delivery type"); }
    else {
        if (date.includes("/")) { date = date.replaceAll("/", "-"); }
        if (date.includes(".")) { date = date.replaceAll(".", "-"); }
        let dateArray = date.split("-");
        let checkMonth = dateArray[0];
        if (checkMonth.length == 1) {
            date = "0" + date;
            dateArray[0] = "0" + checkMonth;
        }
        let checkDay = dateArray[1];
        if (checkDay.length == 1) { date = dateArray[0] + "-0" + dateArray[1] + "-" + dateArray[2]; }

        let sales = { sales: "0.00" }
        let invoice = { delivery: deliveryType, provider: providerType, cost: cost }
        let invoiceArray = []
        if (date in invoice_globalJSON) { invoiceArray = invoice_globalJSON[date]; }
        else { invoiceArray.push(sales) }
        invoiceArray.push(invoice);
        invoice_globalJSON[date] = invoiceArray;

        if (invoice_serverActive) { invoice_updateJSON(); }

        if (document.querySelector(".invoice_date-selected")) {
            let oldActiveDate = document.querySelector(".invoice_date-selected");
            oldActiveDate.classList.remove("invoice_date-selected");
        }
        invoice_drawDates();
        invoice_closePopup();
        invoice_clickedDatePassed(date);
        invoice_reselectDate(date);
    }
}

/**
 * Verifies if a date is in a valid format
 * @param {String} date - The date string, in the format "MM-DD-YYYY"
 * @returns true or false, depending on if the date is valid
 */
function invoice_validateDate(date) {
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
 * Draws all dates into the invoice container sidebar
 */
function invoice_drawDates() {
    let list = invoice_containerDates;
    list.innerHTML = ``;
    let keyArray = []
    for (const [key, value] of Object.entries(invoice_globalJSON)) { keyArray.push(key); }
    keyArray.sort();
    for (var i = 0; i < keyArray.length; i++) {
        let html = `<p class="date-item" onclick="invoice_clickedDate(this)">${keyArray[i]}</p>`;
        list.insertAdjacentHTML("beforeend", html);
    }
}

/**
 * Displays the invoices for a clicked date
 * @param {HTML DOM} element - The date element clicked
 */
function invoice_clickedDate(element) {
    invoice_cancelSales();
    invoice_clearDatesSelected();
    invoice_resetHeaders();
    resetInvoiceTable();
    document.getElementById("invoice_edit-sales").style.display = "flex";
    invoice_iconSaveIndividual.classList.remove("offset-with-delete");
    invoice_iconDeleteKey.classList.remove("offset")
    let oldSelected = document.querySelectorAll(".invoice_date-selected");
    for (var i = 0; i < oldSelected.length; i++) { oldSelected[i].classList.remove("invoice_date-selected"); }
    element.classList.add("invoice_date-selected");

    let date = element.textContent;
    let array = invoice_globalJSON[date]
    let invoiceNum = 1;
    let totalCost = 0;
    for (var j = 1; j < array.length; j++) {
        let delivery = array[j].delivery;
        let provider = array[j].provider;
        let cost = parseFloat(array[j].cost);
        cost = cost.toFixed(2);
        totalCost = totalCost + parseFloat(cost);

        let emptyRows = invoice_tableIndividualBody.querySelectorAll(".invoice-empty-row");
        if (emptyRows.length > 0) {
            emptyRows[0].innerHTML = `
            <td>${invoiceNum}</td>
            <td>${delivery}</td>
            <td>${provider}</td>
            <td>${cost}
                <div class="invoice_remove">
                    <img class="remove-X" src="/icons/xmark-solid.svg">
                </div>
            </td>
            `;
            emptyRows[0].classList.remove("invoice-empty-row");
            emptyRows[0].classList.add("invoice-row");
        }
        else {
            let html = `
            <tr class="invoice-row">
                <td>${invoiceNum}</td>
                <td>${delivery}</td>
                <td>${provider}</td>
                <td>${cost}
                    <div class="invoice_remove offset">
                        <img class="remove-X" src="/icons/xmark-solid.svg">
                    </div>
                </td>
            </tr>
            `;
            invoice_tableIndividualBody.insertAdjacentHTML("beforeend", html);
        }
        invoice_appendDeleteToLastRow();
        invoiceNum++;
    }

    invoice_containerCost.style.display = 'flex'
    let sales = parseFloat(array[0].sales);
    totalCost = Math.round(parseFloat(totalCost) * 100) / 100
    sales = Math.round(parseFloat(sales) * 100) / 100

    invoice_valueCost.innerText = totalCost.toFixed(2);
    invoice_inputSalesValue.innerText = sales.toFixed(2);
    let difference = sales - totalCost
    difference = Math.round(parseFloat(difference) * 100) / 100
    invoice_valueDifference.innerText = difference.toFixed(2);

    let div = document.querySelector(".invoice-table-container");
    let hasVerticalScrollbar = div.scrollHeight > div.clientHeight;
    if (hasVerticalScrollbar) {
        invoice_iconSaveIndividual.classList.add("offset-with-delete");
        invoice_iconDeleteKey.classList.add("offset");
        let removeIcons = document.querySelectorAll(".invoice_remove");
        for (var i = 0; i < removeIcons.length; i++) { removeIcons[i].classList.add("offset"); }
    }
}

/**
 * Similar to the clicked date function above, but takes a string as a parameter instead
 * and draws it accordingly
 * @param {String} date - The date passed in the format "MM-DD-YYYY"
 */
function invoice_clickedDatePassed(date) {
    invoice_cancelSales();
    invoice_clearDatesSelected();
    invoice_resetHeaders();
    resetInvoiceTable();

    document.getElementById("invoice_edit-sales").style.display = "flex";

    let array = invoice_globalJSON[date]
    let invoiceNum = 1;
    let totalCost = 0;
    for (var j = 1; j < array.length; j++) {
        let delivery = array[j].delivery;
        let provider = array[j].provider;
        let cost = parseFloat(array[j].cost);
        cost = cost.toFixed(2);
        totalCost = totalCost + parseFloat(cost);

        let emptyRows = invoice_tableIndividualBody.querySelectorAll(".invoice-empty-row");
        if (emptyRows.length > 0) {
            emptyRows[0].innerHTML = `
            <td>${invoiceNum}</td>
            <td>${delivery}</td>
            <td>${provider}</td>
            <td>${cost}
                <div class="invoice_remove">
                    <img class="remove-X" src="/icons/xmark-solid.svg">
                </div>
            </td>
            `;
            emptyRows[0].classList.remove("invoice-empty-row");
            emptyRows[0].classList.add("invoice-row");
        }
        else {
            let html = `
            <tr class="invoice-row">
                <td>${invoiceNum}</td>
                <td>${delivery}</td>
                <td>${provider}</td>
                <td>${cost}
                    <div class="invoice_remove offset">
                        <img class="remove-X" src="/icons/xmark-solid.svg">
                    </div>
                </td>
            </tr>
            `;
            invoice_tableIndividualBody.insertAdjacentHTML("beforeend", html);
        }
        invoice_appendDeleteToLastRow();
        invoiceNum++;
    }
    invoice_containerCost.style.display = 'flex'
    let sales = array[0].sales
    totalCost = Math.round(parseFloat(totalCost) * 100) / 100
    sales = Math.round(parseFloat(sales) * 100) / 100
    invoice_valueCost.innerText = totalCost.toString();
    invoice_inputSalesValue.innerText = sales;
    let difference = sales - totalCost
    difference = Math.round(parseFloat(difference) * 100) / 100
    invoice_valueDifference.innerText = difference
}

/**
 * Adds a delete option to each row  
 */
function invoice_appendDeleteToLastRow() {
    let rows = document.querySelectorAll(".invoice-row");
    let lastRowIndex = rows.length - 1;
    let showX = rows[lastRowIndex].querySelector(".invoice_remove");
    rows[lastRowIndex].addEventListener("mouseover", function () { showX.style.display = "flex"; }, false);
    rows[lastRowIndex].addEventListener("mouseleave", function () { showX.style.display = "none"; }, false);

    showX.addEventListener("mouseover", function () {
        showX.style.filter = "brightness(0.9) invert(.6) sepia(.9) hue-rotate(0deg) saturate(80)";
    });
    showX.addEventListener("mouseleave", function () {
        showX.style.filter = null;
    });

    showX.addEventListener("click", function () {
        if (confirm("Are you sure you want to delete this invoice?")) {
            let row = showX.closest(".invoice-row");
            let cells = row.getElementsByTagName("td");
            let num = cells[0].innerText;
            let date = document.querySelector(".invoice_date-selected").innerText;
            let array = invoice_globalJSON[date];
            let newArray = [];

            /* Add sales first, which is always the first value in the array */
            newArray.push(array[0]);
            for (var i = 1; i < array.length; i++) {
                if (i != num) { newArray.push(invoice_globalJSON[date][i]); }
            }
            let dateEmpty = false;
            if (newArray.length == 1) {
                dateEmpty = true;
                delete invoice_globalJSON[date];
            }
            else { invoice_globalJSON[date] = newArray; }

            invoice_updateJSON();
            invoice_drawDates();
            /* If the date is not empty, reselect it. Otherwise, delete it and go to the next available date */
            if (!dateEmpty) {
                invoice_clickedDatePassed(date);
                invoice_reselectDate(date);
            }
            else {
                let documentScope = document.getElementById("invoice_tool");
                let newDate = documentScope.querySelectorAll(".date-item");
                let newDateString = newDate[newDate.length - 1].innerText;
                invoice_clickedDatePassed(newDateString);
                invoice_reselectDate(newDateString);
            }
        }
    });
}

/**
 * Reselects a date in the invoice date sidebar
 * @param {String} date - A date in the format "MM-DD-YYYY"
 */
function invoice_reselectDate(date) {
    let documentScope = document.getElementById("invoice_tool");
    let dates = documentScope.querySelectorAll(".date-item");
    for (var i = 0; i < dates.length; i++) {
        if (dates[i].innerText == date) { dates[i].classList.add("invoice_date-selected"); }
    }
}

/**
 * Resets the invoice table's body to its default
 */
function resetInvoiceTable() {
    let invoiceTable = invoice_tableIndividualBody;
    invoiceTable.innerHTML = "";
    for (var i = 0; i < 8; i++) {
        let html = `  
        <tr class="invoice-empty-row">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>`
        invoiceTable.insertAdjacentHTML("beforeend", html);
    }
}

/**
 * Resets the invoice total table's body to its default
 */
function resetTotalTable() {
    let invoiceTable = invoice_tableTotalBody;
    invoiceTable.innerHTML = "";
    for (var i = 0; i < 8; i++) {
        let html = `  
        <tr class="total-empty-row">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>`
        invoiceTable.insertAdjacentHTML("beforeend", html);
    }
}

/**
 * Closes the invoice alert message 
 */
function invoice_closeAlertMsg() {
    invoice_messageAlert.style.display = 'none';
}

/**
 * Reverts sales options to default if cancelled
 */
function invoice_cancelSales() {
    let salesDiv = invoice_inputSalesValue;
    salesDiv.contentEditable = 'false';
    salesDiv.textContent = invoice_oldSales;
    salesDiv.style.textDecoration = 'none';
    invoice_containerConfigButtons.style.display = 'inline';
    invoice_containerConfigSalesButtons.style.display = 'none';
}

/**
 * Allows the sales value to be edited
 */
function invoice_editSales() {
    let salesText = invoice_inputSalesValue;
    invoice_oldSales = salesText.textContent;
    salesText.contentEditable = 'true';
    salesText.style.textDecoration = 'underline';
    invoice_containerConfigButtons.style.display = 'none';
    invoice_containerConfigSalesButtons.style.display = 'inline';
}

/**
 * If the sales value has been updated, update it in the array and json stored on the server
 */
function invoice_updateSales() {
    let salesDiv = invoice_inputSalesValue;
    salesDiv.contentEditable = 'false';
    salesDiv.style.textDecoration = 'none';
    let sales = salesDiv.textContent
    let date = document.querySelector(".invoice_date-selected").textContent;
    invoice_globalJSON[date][0].sales = sales
    invoice_calculateDifference();

    if (invoice_serverActive) { invoice_updateJSON(); }

    invoice_containerConfigButtons.style.display = 'inline';
    invoice_containerConfigSalesButtons.style.display = 'none';
}

/**
 * Updates the sales if the user presses "Enter"
 * @param {HTML DOM} element - The user's keypresses
 */
function invoice_updateSalesEnter(element) {
    if (element.key === 'Enter') { invoice_updateSales(); }
}

/**
 * Hides all the sales options buttons
 */
function invoice_hideSalesButtons() {
    invoice_containerConfigButtons.style.display = 'none';
    invoice_containerConfigSalesButtons.style.display = 'none';
}

/**
 * Shows the sales options buttons
 */
function showSalesButtons() {
    invoice_containerConfigButtons.style.display = 'inline';
}

/**
 * Calculates the difference between sales and cost and updates it on the invoice view
 */
function invoice_calculateDifference() {
    let selectedDateElement = document.querySelector(".invoice_date-selected");
    let date = selectedDateElement.textContent;
    let array = invoice_globalJSON[date];
    let totalCost = 0;
    for (var i = 1; i < array.length; i++) {
        let cost = array[i].cost;
        totalCost = totalCost + parseFloat(cost);
    }
    let sales = parseFloat(invoice_globalJSON[date][0].sales)
    let difference = sales - totalCost
    invoice_valueDifference.innerText = difference
}

/**
 * Starts the process of combining invoices, depending on the timeframe selected
 */
function invoice_calculateTotalInvoices() {
    let type = invoice_valueType.textContent;
    let range = invoice_valueTime.textContent;

    if (range == "This Week") {
        invoice_containerDefaultOptions.style.display = "none";
        invoice_containerClearOptions.style.display = "flex";
        invoice_calculateThisWeek(type)
    }
    else if (range == "Last Week") {
        invoice_containerDefaultOptions.style.display = "none";
        invoice_containerClearOptions.style.display = "flex";
        invoice_calculateLastWeek(type);
    }
    else if (range == "Custom") {
        invoice_rowDefaultOptions.style.display = 'none';
        invoice_containerCustomOptions.style.display = 'flex';
        invoice_containerCustomOptionsButtons.style.display = 'flex';
        invoice_containerDefaultOptions.style.display = "none";
    }
}

/**
 * If the timeframe is "Custom", verify the user's start and end dates are valid and then 
 * calculate it
 */
function invoice_calculateCustomWeek() {
    invoice_hideSalesButtons();
    let startOfWeek = invoice_inputStartDateCustomValue.value;
    let endOfWeek = invoice_inputEndDateCustomValue.value;
    let startMoment = moment(startOfWeek, "MM-DD-YYYY");
    let endMoment = moment(endOfWeek, "MM-DD-YYYY");
    let startDateObj = startMoment.toDate();
    let endDateObj = endMoment.toDate();

    if ((startDateObj == "Invalid Date") || (endDateObj == "Invalid Date")) {
        alert("ERROR: Please input valid dates in the format MM-DD-YYYY");
    }
    else if (startDateObj > endDateObj) {
        alert("ERROR: Start date cannot be greater than end date")
    }
    else {
        let type = invoice_valueTypeCustom.textContent;
        invoice_calculateDates(startDateObj, endDateObj, type);
        invoice_hideOptionsRow();
        let documentScope = document.getElementById("invoice_tool");
        let dateItems = documentScope.querySelectorAll(".date-item");
        for (var i = 0; i < dateItems.length; i++) {
            dateItems[i].style.pointerEvents = "none";
        }
        invoice_containerClearOptions.style.display = "flex";
        invoice_containerCustomOptionsButtons.style.display = "none";
    }
}

/**
 * Find the dates for last week and ccalculate the total of those invoices
 * @param {String} flag - Either Kitchen, Bar, or All
 */
function invoice_calculateLastWeek(flag) {
    invoice_hideSalesButtons();
    let startOfWeek = GetFirstDayOfLastWeek().toDate();
    let endOfWeek = GetLastDayOfLastWeek().toDate();
    invoice_calculateDates(startOfWeek, endOfWeek, flag);
    invoice_hideOptionsRow();
    let documentScope = document.getElementById("invoice_tool");
    let dateItems = documentScope.querySelectorAll(".date-item");
    for (var i = 0; i < dateItems.length; i++) { dateItems[i].style.pointerEvents = "none"; } 
}

/**
 * Find the dates for this week and ccalculate the total of those invoices
 * @param {String} flag - Either Kitchen, Bar, or All
 */
function invoice_calculateThisWeek(flag) {
    invoice_hideSalesButtons();
    var today = new Date();
    let startOfWeek = today.GetFirstDayOfWeek();
    let endOfWeek = today.GetLastDayOfWeek();
    invoice_calculateDates(startOfWeek, endOfWeek, flag);
    invoice_hideOptionsRow();
    let documentScope = document.getElementById("invoice_tool");
    let dateItems = documentScope.querySelectorAll(".date-item");
    for (var i = 0; i < dateItems.length; i++) {
        dateItems[i].style.pointerEvents = "none";
    }
}

/**
 * Hides the default buttons of the totaling toolbar
 */
function invoice_hideOptionsRow() {
    invoice_rowDefaultOptions.style.display = "none";
    invoice_containerCustomOptions.style.display = "none";
}

/**
 * Displays all of the invcoies within a date range, as well as the total
 * sales, cost, and difference
 * @param {String} startOfWeek - the starting date range
 * @param {String} endOfWeek - the ending date range
 * @param {String} flag - Either Kitchen, Bar, or All
 */
function invoice_calculateDates(startOfWeek, endOfWeek, flag) {
    invoice_iconSaveTotal.classList.remove("offset");
    invoice_iconSaveTotal.classList.add("no-delete");

    invoice_clearDatesSelected();
    let totalSales = 0;
    let totalCost = 0;
    Object.entries(invoice_globalJSON).forEach((entry) => {
        const [key, value] = entry
        let currDate = moment(key, "MM-DD-YYYY");
        currDate = currDate.toDate();
        if (currDate >= startOfWeek && currDate <= endOfWeek) {
            let array = invoice_globalJSON[key];
            let sales = parseFloat(invoice_globalJSON[key][0].sales);
            totalSales = totalSales + sales;
            let invoiceNum = 1;
            for (var j = 1; j < array.length; j++) {
                let delivery = array[j].delivery;
                let provider = array[j].provider;
                let cost = 0;
                if (flag == "All") { cost = array[j].cost; }
                else if (flag == "Kitchen") {
                    if (delivery == "Kitchen") { cost = array[j].cost; }
                    else { continue; }
                }
                else if (flag == "Bar") {
                    if (delivery == "Bar") { cost = array[j].cost; }
                    else { continue; }
                }
                totalCost = totalCost + parseFloat(cost);
                let totalTable = invoice_tableTotalBody;
                let emptyRows = totalTable.querySelectorAll(".total-empty-row");
                if (emptyRows.length > 0) {
                    emptyRows[0].innerHTML = `
                    <td>${key}</td>
                    <td>${invoiceNum}</td>
                    <td>${delivery}</td>
                    <td>${provider}</td>
                    <td>${cost}</td>`;
                    emptyRows[0].classList.remove("total-empty-row");
                }
                else {
                    let html = `
                    <td>${key}</td>
                    <td>${invoiceNum}</td>
                    <td>${delivery}</td>
                    <td>${provider}</td>
                    <td>${cost}</td>`;
                    totalTable.insertAdjacentHTML("beforeend", html);
                }
                invoiceNum++;
                invoice_reselectDate(key);
            }
        }
    });
    invoice_containerCost.style.display = 'flex'

    invoice_startingWeek = (startOfWeek.getMonth() + 1) + "-" + startOfWeek.getDate() + "-" + startOfWeek.getFullYear();
    invoice_endingWeek = (endOfWeek.getMonth() + 1) + "-" + endOfWeek.getDate() + "-" + endOfWeek.getFullYear();

    totalCost = Math.round(parseFloat(totalCost) * 100) / 100
    totalSales = Math.round(parseFloat(totalSales) * 100) / 100
    invoice_containerMessage.textContent = 'Total for ' + invoice_startingWeek + " through " + invoice_endingWeek + " for " + flag + " invoices";
    invoice_containerMessage.style.display = "flex";
    invoice_headerCost.textContent = "Total Cost:";
    invoice_valueCost.textContent = parseFloat(totalCost).toFixed(2);
    invoice_headerSales.textContent = "Total Sales:";
    invoice_inputSalesValue.textContent = parseFloat(totalSales).toFixed(2);
    let totalDifference = parseFloat(totalSales) - parseFloat(totalCost);
    totalDifference = Math.round(parseFloat(totalDifference) * 100) / 100
    invoice_headerDifference.textContent = "Total Difference:";
    invoice_valueDifference.textContent = parseFloat(totalDifference).toFixed(2);
    invoice_tableIndividual.style.display = "none";
    invoice_tableTotal.style.display = "table";
    let div = document.querySelector(".invoice-table-container");
    let hasVerticalScrollbar = div.scrollHeight > div.clientHeight;
    if (hasVerticalScrollbar) { invoice_iconSaveTotal.classList.add("offset"); }
}

/**
 * Added to a Date object the ability to get the first day of the week
 * @returns the first day of this week
 */
Date.prototype.GetFirstDayOfWeek = function () {
    return (new Date(this.setDate(this.getDate() - this.getDay() + (this.getDay() == 0 ? -6 : 1))));
}

/**
 * Added to a Date object the ability to get the last day of the week
 * @returns the last day of this week
 */
Date.prototype.GetLastDayOfWeek = function () {
    return (new Date(this.setDate(this.getDate() - this.getDay() + 7)));
}

/**
 * Finds the first day of last week
 * @returns the first day of last week
 */
function GetFirstDayOfLastWeek() {
    return (moment().subtract(1, 'week').startOf('isoWeek'));
}

/**
 * Finds the last day of last week
 * @returns the last day of last week
 */
function GetLastDayOfLastWeek() {
    return (moment().subtract(1, 'week').endOf('isoWeek'));
}

/**
 * Clears all dates selected in the date sidebar
 */
function invoice_clearDatesSelected() {
    let list = document.querySelectorAll(".date-add");
    for (var i = 0; i < list.length; i++) {
        list[i].classList.remove("date-add");
    }

    list = document.querySelectorAll(".invoice_date-selected");
    for (var i = 0; i < list.length; i++) {
        list[i].classList.remove("invoice_date-selected");
    }
}

/**
 * Resets the totaling toolbar to its default values
 */
function invoice_resetTotal() {
    invoice_clearDatesSelected();
    invoice_drawDates();
    invoice_containerDates.removeEventListener("click", selectInvoice);
    invoice_containerMessage.textContent = "";
    invoice_containerMessage.display = "none";
    invoice_containerCustomOptions.style.display = 'none';
    invoice_rowDefaultOptions.style.display = 'flex';
    invoice_containerClearOptions.style.display = 'none';
    invoice_containerDefaultOptions.style.display = "flex";
    invoice_containerSelectOptions.style.display = "none";
    invoice_containerCustomOptionsButtons.style.display = 'none';
    invoice_valueType.textContent = "All";
    invoice_valueTime.textContent = "This Week";
    let documentScope = document.getElementById("invoice_tool");
    let dateItems = documentScope.querySelectorAll(".date-item");    
    for (var i = 0; i < dateItems.length; i++) { dateItems[i].style.pointerEvents = null; }

    invoice_tableIndividual.style.display = "table";
    resetInvoiceTable();
    invoice_tableTotal.style.display = "none";
    resetTotalTable();

    invoice_iconSaveIndividual.classList.remove("offset");
    invoice_iconSaveTotal.classList.remove("offset");
    invoice_iconDeleteKey.classList.remove("offset");
    invoice_iconSaveIndividual.classList.remove("offset-with-delete");
    invoice_iconSaveTotal.classList.remove("no-delete");
    invoice_inputStartDateCustomValue.value = "MM-DD-YYYY";
    invoice_inputEndDateCustomValue.value = "MM-DD-YYYY";
    invoice_valueTypeCustom.innerText = "All";
}

/**
 * Resets the cost, sales, and difference headers to their default
 */
function invoice_resetHeaders() {
    invoice_headerCost.textContent = "Cost:";
    invoice_headerSales.textContent = "Sales:";
    invoice_headerDifference.textContent = "Difference:";
}

/**
 * Starts the process of selecting specific dates in the sidebar to total
 */
function invoice_selectTotal() {
    invoice_hideOptionsRow();
    invoice_clearDatesSelected();
    resetInvoiceTable();
    invoice_containerDefaultOptions.style.display = "none";
    invoice_containerSelectOptions.style.display = "flex";

    invoice_containerMessage.textContent = "Select the invoices to add together";
    invoice_containerMessage.style.display = "flex";
    invoice_containerDates.addEventListener("click", selectInvoice);

    let documentScope = document.getElementById("invoice_tool");
    let dates = documentScope.querySelectorAll(".date-item");
    for (var i = 0; i < dates.length; i++) { dates[i].removeAttribute("onclick"); }
}

/**
 * Selects a date to combine with other selected dates
 * @param {HTML DOM} element - The date option in the sidebar
 */
function selectInvoice(element) {
    if (element.target.classList.contains("date-item")) {
        element.target.classList.toggle("invoice-selected");
        invoice_clickedDatePassed(element.target.innerText);
    }
}

/**
 * Displays the invoices for selected days as well as the total cost, sales,
 * and difference
 */
function invoice_calculateSelected() {
    invoice_datesSelected = true;
    invoice_iconSaveTotal.classList.remove("offset");
    invoice_iconSaveTotal.classList.add("no-delete");

    invoice_clearDatesSelected();

    let totalSales = 0;
    let totalCost = 0;
    let dates = document.querySelectorAll(".invoice-selected");
    for (var i = 0; i < dates.length; i++) {
        let key = dates[i].innerText;
        let array = invoice_globalJSON[key];
        let sales = parseFloat(invoice_globalJSON[key][0].sales);
        totalSales = totalSales + sales;
        let invoiceNum = 1;
        for (var j = 1; j < array.length; j++) {
            let delivery = array[j].delivery;
            let provider = array[j].provider;
            let cost = array[j].cost;
            totalCost = totalCost + parseFloat(cost);
            let totalTable = invoice_tableTotalBody;
            let emptyRows = totalTable.querySelectorAll(".total-empty-row");
            if (emptyRows.length > 0) {
                emptyRows[0].innerHTML = `
                <td>${key}</td>
                <td>${invoiceNum}</td>
                <td>${delivery}</td>
                <td>${provider}</td>
                <td>${cost}</td>`;
                emptyRows[0].classList.remove("total-empty-row");
            }
            else {
                let html = `
                <td>${key}</td>
                <td>${invoiceNum}</td>
                <td>${delivery}</td>
                <td>${provider}</td>
                <td>${cost}</td>`;
                totalTable.insertAdjacentHTML("beforeend", html);
            }
            invoiceNum++;
        }
    }

    invoice_containerCost.style.display = 'flex'
    totalCost = Math.round(parseFloat(totalCost) * 100) / 100
    totalSales = Math.round(parseFloat(totalSales) * 100) / 100
    invoice_containerMessage.textContent = `Total for selected dates's invoices`;
    invoice_containerMessage.style.display = "flex";
    invoice_headerCost.textContent = "Total Cost:";
    invoice_valueCost.textContent = parseFloat(totalCost).toFixed(2);
    invoice_headerSales.textContent = "Total Sales:";
    invoice_inputSalesValue.textContent = parseFloat(totalSales).toFixed(2);
    let totalDifference = parseFloat(totalSales) - parseFloat(totalCost);
    totalDifference = Math.round(parseFloat(totalDifference) * 100) / 100
    invoice_headerDifference.textContent = "Total Difference:";
    invoice_valueDifference.textContent = parseFloat(totalDifference).toFixed(2);
    invoice_tableIndividual.style.display = "none";
    invoice_tableTotal.style.display = "table";

    let div = document.querySelector(".invoice-table-container");
    let hasVerticalScrollbar = div.scrollHeight > div.clientHeight;
    if (hasVerticalScrollbar) { invoice_iconSaveTotal.classList.add("offset"); }

    let documentScope = document.getElementById("invoice_tool");
    let dateItems = documentScope.querySelectorAll(".date-item");    
    for (var i = 0; i < dateItems.length; i++) { dateItems[i].style.pointerEvents = "none"; }

    invoice_containerSelectOptions.style.display = "none";
    invoice_containerClearOptions.style.display = "flex";
}