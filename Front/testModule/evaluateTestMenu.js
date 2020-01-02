"use strict"

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');
let attributions;
let answers = [];
let tests;

getAttributions().then(
    () => {
        getTests().then(
            () => {
                getAnswers().then(
                    () => {;
                        // now we have attributions, tests and answers - we may try to create test table
                        createTestTable();
                    })
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

function getAnswers() {
    return new Promise((resolve, reject) => {
        for (let attr in attributions.attributions) {
            const answerID = attributions.attributions[attr].candidate.concat("-", attributions.attributions[attr].testID);
            $.ajax({
                url: `https://dj9pgircgf.execute-api.us-east-1.amazonaws.com/SaversAPI/answer/${answerID}`,
                type: "GET",
                success: data => {
                    console.log(data);
                    answers[attr] = JSON.parse(data.body);
                },
                error: err => {
                    console.log(err.responseJSON);
                    return reject(err.responseText)
                }
            })
        }
        console.log(answers);
        return resolve()
    })
}

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
    table.classList.add("table", "table-bordered");
    table.classList.add("text", "text-center");

    //set first row of a column
    let firstRow = document.createElement("tr");

    let firstRowName = document.createElement("td");
    let firstRowNameText = document.createTextNode("Candidate");
    firstRowName.appendChild(firstRowNameText);
    firstRow.appendChild(firstRowName);

    let firstRowTest = document.createElement("td");
    let firstRowTestText = document.createTextNode("Test title");
    firstRowTest.appendChild(firstRowTestText);
    firstRow.appendChild(firstRowTest);

    let firstRowQuestionNumber = document.createElement("td");
    let firstRowQuestionNumberText = document.createTextNode("State");
    firstRowQuestionNumber.appendChild(firstRowQuestionNumberText);
    firstRow.appendChild(firstRowQuestionNumber);

    let firstRowDelete = document.createElement("td");
    let firstRowDeleteText = document.createTextNode("Evaluate");
    firstRowDelete.appendChild(firstRowDeleteText);
    firstRow.appendChild(firstRowDelete);

    table.appendChild(firstRow);

    for (let attr in attributions.attributions) {
        // console.log(attributions.attributions[attr])
        let identificator = attributions.attributions[attr].candidate+"-"+attributions.attributions[attr].testID
        console.log(identificator)
        let newElement = document.createElement("tr");

        let newTableCellId = document.createElement("td");
        let newContentId = document.createTextNode(attributions.attributions[attr].candidate);
        newTableCellId.appendChild(newContentId);
        newElement.appendChild(newTableCellId);

        let newTableCellQuestion = document.createElement("td");
        let newContentQuestion = document.createTextNode(getTestName(attributions.attributions[attr].testID));
        newTableCellQuestion.appendChild(newContentQuestion);
        newElement.appendChild(newTableCellQuestion);

        let newTableCellQuestionNumber = document.createElement("td");
        let newContentQuestionNumber = document.createTextNode(getStateName(attributions.attributions[attr].state));
        newTableCellQuestionNumber.appendChild(newContentQuestionNumber);
        newElement.appendChild(newTableCellQuestionNumber);

        //add evaluate button cell
        let newTableCellButton = document.createElement("td");
        let newAssignButton = document.createElement("input");
        newAssignButton.type = "button";
        if(attributions.attributions[attr].state==1) {
            newAssignButton.classList.add("button", "btn");
            newAssignButton.classList.add("button", "btn-success");
            newAssignButton.value = "Evaluate";
                newAssignButton.addEventListener("click",
                function () {
                    console.log("eval");
                    window.open(`evaluateTest.html?id=${identificator}`, "_self");
                });
        }
        if(attributions.attributions[attr].state==0) {
            newAssignButton.classList.add("button", "btn");
            newAssignButton.classList.add("button", "btn-info");
            newAssignButton.value = "Unresolved";
              
        }
        if(attributions.attributions[attr].state==2) {
            newAssignButton.classList.add("button", "btn");
            newAssignButton.classList.add("button", "btn-danger");
            newAssignButton.value = "Check again";
                newAssignButton.addEventListener("click",
                function () {
                    console.log("eval");
                    window.open(`evaluateTest.html?id=${identificator}`, "_self");
                });
        }
        
        
      
        newTableCellButton.appendChild(newAssignButton);
        newElement.appendChild(newTableCellButton);

        table.appendChild(newElement);
    }

    tableDiv.appendChild(table);
}

function getStateName(number) {
    if (number == 0)
        return "created";
    else if (number == 1)
        return "solved";
    else if (number == 2)
        return "evaluated";
}

function getTestName(id) {
    for (let test in tests.tests) {
        if (tests.tests[test].id == id)
            return tests.tests[test].name;
    }
    return "no test with given id";
}
function managePanel() {
    window.open("../manageTests.html", "_self");
}