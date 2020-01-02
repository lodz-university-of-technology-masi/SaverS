"use strict"

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');
let attributions;
let answers = [];
let tests;

getAttributions().then(
    () => {
        getTests().then(
            () =>  {
                        // now we have attributions, tests - we may try to create editable test table
                        createTestTable();
                    })
            })
    

function getAttributions() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://dj9pgircgf.execute-api.us-east-1.amazonaws.com/SaversAPI/attribution/recruiter/${myParam}`,
            type: "GET",
            success: data => {
                console.log(data);
                attributions = JSON.parse(data.body);
                return resolve()
            },
            error: err => {
                console.log(err.responseJSON);
                return reject(err.responseText)
            }
        })
    })
};

function getTests() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://dj9pgircgf.execute-api.us-east-1.amazonaws.com/SaversAPI/tests/${myParam}`,
            type: "GET",
            success: data => {
                console.log(data);
                tests = JSON.parse(data.body);
                return resolve()
            },
            error: err => {
                console.log(err.responseJSON);
                return reject(err.responseText)
            }
        })
    })
}

function createTestTable() {
    let tableDiv = document.getElementById("testsdiv");

    //remove all elements
    while (tableDiv.firstChild) {
        tableDiv.removeChild(tableDiv.firstChild);
    }

    //create table
    let table = document.createElement("table");
    table.classList.add("table", "table-bordered","table-responsive");
    table.classList.add("text", "text-center");

    //set first row of a column
    let firstRow = document.createElement("tr");

    let firstRowName = document.createElement("td");
    let firstRowNameText = document.createTextNode("Number");
    firstRowName.appendChild(firstRowNameText);
    firstRow.appendChild(firstRowName);

    let firstRowTest = document.createElement("td");
    let firstRowTestText = document.createTextNode("Test title");
    firstRowTest.appendChild(firstRowTestText);
    firstRow.appendChild(firstRowTest);

    let firstRowQuestionNumber = document.createElement("td");
    let firstRowQuestionNumberText = document.createTextNode("Edit");
    firstRowQuestionNumber.appendChild(firstRowQuestionNumberText);
    firstRow.appendChild(firstRowQuestionNumber);

    table.appendChild(firstRow);
    let number = 0;

    for (let test in tests.tests) {
        
        number++;
        let id = tests.tests[test].id;

        let newElement = document.createElement("tr");

        let newTableCellId = document.createElement("td");
        let newContentId = document.createTextNode(number);
        newTableCellId.appendChild(newContentId);
        newElement.appendChild(newTableCellId);

        let newTableCellQuestionNumber = document.createElement("td");
        let newContentQuestionNumber = document.createTextNode(tests.tests[test].name);
        newTableCellQuestionNumber.appendChild(newContentQuestionNumber);
        newElement.appendChild(newTableCellQuestionNumber);

        //add edit button cell
        let newTableCellButton = document.createElement("td");
      
        if(isEditable(tests.tests[test])) {
            let newAssignButton = document.createElement("input");
            newAssignButton.type = "button";
            newAssignButton.classList.add("button", "btn");
            newAssignButton.classList.add("button", "btn-success");
            newAssignButton.value = "Edit";
            newAssignButton.addEventListener("click",
            function () {
                console.log("edit");
                window.open(`editTest.html?id=${id}`, "_self");
            });
            newTableCellButton.appendChild(newAssignButton);
        } else {
            let newP = document.createElement("p");
            let newTextNode = document.createTextNode("Already solved by someone!");
            newP.appendChild(newTextNode);
            newTableCellButton.appendChild(newP);
        }
        
        newElement.appendChild(newTableCellButton);
        table.appendChild(newElement);
    }

    tableDiv.appendChild(table);
}

function managePanel() {
    window.open("../testManagement/manageTests.html", "_self");
}

function isEditable(test) {
    for (let attr in attributions.attributions) {
        if (attributions.attributions[attr].testID == test.id) {
            if (attributions.attributions[attr].state > 0)
                return false;
        }
    }
    return true;
}