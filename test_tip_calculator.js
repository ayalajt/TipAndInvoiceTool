var runTests = false;

if (runTests) {
    serverActive = false;
    test_verifyResultsOne();
}

function test_verifyResultsOne() {
    it('Tests the math for the tip calculator is correct', function () {
        buttonClearAll.click();

        /* Set day information */
        inputManager.value = "John Doe";
        inputDate.value = "12-20-2025";
        timeSelected.innerHTML = "Lunch";
        inputCash.value = "0.00"
        inputFoodSales.value = "3930.00";

        /* Set worker information */
        openPopup();
        inputWorkerName.value = "Worker 1";
        positionSelected.innerHTML = "Bartender";
        inputWorkerStartTime.value = "01:00";
        inputWorkerEndTime.value = "08:30"
        inputWorkerTips.value = "93.00";
        buttonAddWorker.click();

        openPopup();
        inputWorkerName.value = "Worker 2";
        positionSelected.innerHTML = "Bartender";
        inputWorkerStartTime.value = "01:00";
        inputWorkerEndTime.value = "08:00"
        inputWorkerTips.value = "95.00";
        buttonAddWorker.click();

        openPopup();
        inputWorkerName.value = "Worker 3";
        positionSelected.innerHTML = "Expo";
        inputWorkerStartTime.value = "01:00";
        inputWorkerEndTime.value = "05:00"
        inputWorkerTips.value = "22.00";
        buttonAddWorker.click();

        openPopup();
        inputWorkerName.value = "Worker 4";
        positionSelected.innerHTML = "Server";
        inputWorkerStartTime.value = "01:00";
        inputWorkerEndTime.value = "07:00"
        inputWorkerTips.value = "256.00";
        buttonAddWorker.click();

        openPopup();
        inputWorkerName.value = "Worker 5";
        positionSelected.innerHTML = "Server";
        inputWorkerStartTime.value = "01:00";
        inputWorkerEndTime.value = "09:30"
        inputWorkerTips.value = "401.00";
        buttonAddWorker.click();

        openPopup();
        inputWorkerName.value = "Worker 6";
        positionSelected.innerHTML = "Server";
        inputWorkerStartTime.value = "01:00";
        inputWorkerEndTime.value = "09:30"
        inputWorkerTips.value = "231.00";
        buttonAddWorker.click();

        openPopup();
        inputWorkerName.value = "Worker 7";
        positionSelected.innerHTML = "Server";
        inputWorkerStartTime.value = "01:00";
        inputWorkerEndTime.value = "09:30"
        inputWorkerTips.value = "369.00";
        buttonAddWorker.click();

        openPopup();
        inputWorkerName.value = "Worker 8";
        positionSelected.innerHTML = "Expo";
        inputWorkerStartTime.value = "01:00";
        inputWorkerEndTime.value = "08:00"
        inputWorkerTips.value = "59.00";
        buttonAddWorker.click();

        openPopup();
        inputWorkerName.value = "Worker 9";
        positionSelected.innerHTML = "Dishwasher";
        buttonAddWorker.click();

        buttonCalculateResults.click();

        for (var i = 1, row; row = workerTableResults.rows[i]; i++) {
            /* verify names */
            assert(("Worker " + i) == row.cells[0].innerHTML.trim())

            /* verify each worker's wage and points */
            if (row.cells[0].innerHTML == "Worker 1") {
                /* verify position */
                assert("Bartender" == row.cells[1].innerHTML);
                /* verify wage */
                assert("185" == row.cells[2].innerHTML);
                /* verify points */
                assert("7.5" == row.cells[3].innerHTML);
            }

            /* verify each worker's wage and points */
            if (row.cells[0].innerHTML == "Worker 2") {
                /* verify position */
                assert("Bartender" == row.cells[1].innerHTML);
                /* verify wage */
                assert("173" == row.cells[2].innerHTML);
                /* verify points */
                assert("7" == row.cells[3].innerHTML);
            }

            /* verify each worker's wage and points */
            if (row.cells[0].innerHTML == "Worker 3") {
                /* verify position */
                assert("Expo" == row.cells[1].innerHTML);
                /* verify wage */
                assert("49" == row.cells[2].innerHTML);
                /* verify points */
                assert("2" == row.cells[3].innerHTML);
            }

            /* verify each worker's wage and points */
            if (row.cells[0].innerHTML == "Worker 4") {
                /* verify position */
                assert("Server" == row.cells[1].innerHTML);
                /* verify wage */
                assert("185" == row.cells[2].innerHTML);
                /* verify points */
                assert("7.5" == row.cells[3].innerHTML);
            }

            /* verify each worker's wage and points */
            if (row.cells[0].innerHTML == "Worker 5") {
                /* verify position */
                assert("Server" == row.cells[1].innerHTML);
                /* verify wage */
                assert("263" == row.cells[2].innerHTML);
                /* verify points */
                assert("10.625" == row.cells[3].innerHTML);
            }

            /* verify each worker's wage and points */
            if (row.cells[0].innerHTML == "Worker 6") {
                /* verify position */
                assert("Server" == row.cells[1].innerHTML);
                /* verify wage */
                assert("263" == row.cells[2].innerHTML);
                /* verify points */
                assert("10.625" == row.cells[3].innerHTML);
            }

            /* verify each worker's wage and points */
            if (row.cells[0].innerHTML == "Worker 7") {
                /* verify position */
                assert("Server" == row.cells[1].innerHTML);
                /* verify wage */
                assert("263" == row.cells[2].innerHTML);
                /* verify points */
                assert("10.625" == row.cells[3].innerHTML);
            }

            /* verify each worker's wage and points */
            if (row.cells[0].innerHTML == "Worker 8") {
                /* verify position */
                assert("Expo" == row.cells[1].innerHTML);
                /* verify wage */
                assert("86" == row.cells[2].innerHTML);
                /* verify points */
                assert("3.5" == row.cells[3].innerHTML);
            }

            /* verify each worker's wage and points */
            if (row.cells[0].innerHTML == "Worker 9") {
                /* verify position */
                assert("Dishwasher" == row.cells[1].innerHTML);
                /* verify wage */
                assert("59" == row.cells[2].innerHTML);
                /* verify points */
                assert("-" == row.cells[3].innerHTML);
            }
        }
    });
}

function assert(isTrue) {
    if (!isTrue) {
        throw new Error();
    }
}

function it(desc, fn) {
    try {
        fn();
        console.log('\x1b[32m%s\x1b[0m', '\u2714 ' + desc);
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', '\u2718 ' + desc);
        console.error(error);
    }
}