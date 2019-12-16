const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');
let tests;
let candidates;
let assigns;
let chosenCandidate;

getTests();
tests = tests.tests;
if (tests.length > 0) {
    updateTable();
}

function getTests() {
    $.ajax({
      url: `https://x3vqos9dhc.execute-api.us-east-1.amazonaws.com/TestAPIv2/tests/${myParam}`,
      type: "GET",
      async: false,
      success: data => {
        console.log(data);
        tests = JSON.parse(data.body);
      },
      error: err => {
        console.log(err.responseJSON);
      }
    })
}

function getCandidates() {
    $.ajax({
        method: 'GET',
        async: false,
        url: 'https://6fsmq4shbf.execute-api.us-east-1.amazonaws.com/beta/candidates',
        headers: {
            "Authorization": getToken(),
            "Content-Type": "application/json"
        },
        success: (data) => {
            console.log(data); 
            candidates = data;
        },
        error: (err) => {
            console.log(err);
        }
    });
}

function getAssigns() {

}

function updateTable() {
    let tableDiv = document.getElementById("testTable");

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
    let firstRowNameText = document.createTextNode("Number");
    firstRowName.appendChild(firstRowNameText);
    firstRow.appendChild(firstRowName);

    let firstRowTest = document.createElement("td");
    let firstRowTestText = document.createTextNode("Test title");
    firstRowTest.appendChild(firstRowTestText);
    firstRow.appendChild(firstRowTest);

    let firstRowQuestionNumber = document.createElement("td");
    let firstRowQuestionNumberText = document.createTextNode("Questions");
    firstRowQuestionNumber.appendChild(firstRowQuestionNumberText);
    firstRow.appendChild(firstRowQuestionNumber);

    let firstRowDelete = document.createElement("td");
    let firstRowDeleteText = document.createTextNode("Choose candidate");
    firstRowDelete.appendChild(firstRowDeleteText);
    firstRow.appendChild(firstRowDelete);

    table.appendChild(firstRow);
    let number = 0;

    for (let test in tests) {
        
        number++;
        let newElement = document.createElement("tr");

        //add number table cell
        let newTableCellId = document.createElement("td");
        let newContentId = document.createTextNode(number);
        newTableCellId.appendChild(newContentId);
        newElement.appendChild(newTableCellId);

        //add test title
        let newTableCellQuestion = document.createElement("td");
        let newContentQuestion = document.createTextNode(tests[test].name);
        newTableCellQuestion.appendChild(newContentQuestion);
        newElement.appendChild(newTableCellQuestion);

        //add number of questions
        let newTableCellQuestionNumber = document.createElement("td");
        let newContentQuestionNumber = document.createTextNode(tests[test].questions.length);
        newTableCellQuestionNumber.appendChild(newContentQuestionNumber);
        newElement.appendChild(newTableCellQuestionNumber);

        //add assign button cell
        let newTableCellButton = document.createElement("td");
        let newAssignButton = document.createElement("input");
        newAssignButton.type = "button";
        newAssignButton.classList.add("button", "btn");
        newAssignButton.classList.add("button", "btn-info");
        newAssignButton.value = "Choose";
        newAssignButton.addEventListener("click",
            function () {
                assignModalPopUp(test);
            });
        newTableCellButton.appendChild(newAssignButton);
        newElement.appendChild(newTableCellButton);

        table.appendChild(newElement);
    }

    tableDiv.appendChild(table);
}

function updateCandidatesTable() {
    let tableDiv = document.getElementById("candidatesTable");

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

    let firstRowDesc = document.createElement("td");
    let firstRowDescText = document.createTextNode("Candidate");
    firstRowDesc.appendChild(firstRowDescText);
    firstRow.appendChild(firstRowDesc);

    let firstRowDelete = document.createElement("td");
    let firstRowDeleteText = document.createTextNode("Assign Candidate");
    firstRowDelete.appendChild(firstRowDeleteText);
    firstRow.appendChild(firstRowDelete);

    table.appendChild(firstRow);

    for (let candidate in candidates) {
        
        let newElement = document.createElement("tr");

        //add candidate title
        let newTableCellQuestion = document.createElement("td");
        let newContentQuestion = document.createTextNode(candidates[candidate]);
        newTableCellQuestion.appendChild(newContentQuestion);
        newElement.appendChild(newTableCellQuestion);

        //add assign button cell
        let newTableCellButton = document.createElement("td");
        let newAssignButton = document.createElement("input");
        newAssignButton.type = "button";
        newAssignButton.classList.add("button", "btn");
        newAssignButton.classList.add("button", "btn-success");
        newAssignButton.value = "Assign";
        newAssignButton.addEventListener("click",
            function () {
                chosenCandidate = candidates[candidate];
                assign();
            });
        newTableCellButton.appendChild(newAssignButton);
        newElement.appendChild(newTableCellButton);

        table.appendChild(newElement);
    }

    tableDiv.appendChild(table);
}

function updateAssignedTable() {
    let tableDiv = document.getElementById("assignedTable");

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

    let firstRowTest = document.createElement("td");
    let firstRowTestText = document.createTextNode("Test");
    firstRowTest.appendChild(firstRowTestText);
    firstRow.appendChild(firstRowTest);

    let firstRowCandidate = document.createElement("td");
    let firstRowCandidateText = document.createTextNode("Candidate");
    firstRowCandidate.appendChild(firstRowCandidateText);
    firstRow.appendChild(firstRowCandidate);

    table.appendChild(firstRow);

    for (let assign in assigns) {
        
        let newElement = document.createElement("tr");

        //add candidate title
        let newTableCellQuestion = document.createElement("td");
        let newContentQuestion = document.createTextNode(assigns[assign]);
        newTableCellQuestion.appendChild(newContentQuestion);
        newElement.appendChild(newTableCellQuestion);

        //add assign button cell
        let newTableCellButton = document.createElement("td");
        let newAssignButton = document.createElement("input");
        newAssignButton.type = "button";
        newAssignButton.classList.add("button", "btn");
        newAssignButton.classList.add("button", "btn-success");
        newAssignButton.value = "Assign";
        newAssignButton.addEventListener("click",
            function () {
                assign();
            });
        newTableCellButton.appendChild(newAssignButton);
        newElement.appendChild(newTableCellButton);

        table.appendChild(newElement);
    }

    tableDiv.appendChild(table);
}

function assignModalPopUp() {
    getCandidates();
    updateCandidatesTable();
    $('#assignModal').modal('show');
}

function assign() {
    console.log(chosenCandidate);
    $('#assignModal').modal('hide');
}

function mainPanel() {
    window.open("recruiterMain.html", "_self");
}