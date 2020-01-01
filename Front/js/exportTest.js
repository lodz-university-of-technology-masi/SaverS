const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');
let tests;
let candidates;
let assigns;
let chosenCandidate;
let chosenTest;

getTests();
tests = tests.tests;
if (tests.length > 0) {
    updateTable();
}


function getTests() {
    $.ajax({
      url: `https://dj9pgircgf.execute-api.us-east-1.amazonaws.com/SaversAPI/tests/${myParam}`,
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

function postAssign(assign) {
    return new Promise((resolve, reject) => {
        $.ajax({
          type: 'POST',
          url: 'https://dj9pgircgf.execute-api.us-east-1.amazonaws.com/SaversAPI/attribution',
          data: JSON.stringify(assign),
          contentType: 'application/json',
          success: data => {
            return resolve(data)
          },
          error: err => {
            return reject(err.responseText)
          }
        });
    });
}

function getAssigns() {
    $.ajax({
        method: 'GET',
        async: false,
        url: `https://dj9pgircgf.execute-api.us-east-1.amazonaws.com/SaversAPI/attribution/recruiter/${myParam}`,
        headers: {
            "Authorization": getToken(),
            "Content-Type": "application/json"
        },
        success: (data) => {
            assigns = JSON.parse(data.body);
        },
        error: (err) => {
            console.log(err);
        }
    });
}
//  https://6g43np9o2g.execute-api.us-east-1.amazonaws.com/SaversAPIFinal
function getTest(testID) {
    return new Promise((resolve, reject) => {
    $.ajax({
        method: 'GET',
        async: false,
        url: `https://6g43np9o2g.execute-api.us-east-1.amazonaws.com/SaversAPIFinal/test/export/${testID}`,
        success: (data) => {
            // assigns = JSON.parse(data.body);

            console.log(data);
            return resolve(data)
        },
        error: (err) => {
            return reject(err.responseText)
        }
    });
})}

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
    let firstRowDeleteText = document.createTextNode("Choose test");
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

        //add Export button cell
        let newTableCellButton = document.createElement("td");
        let newAssignButton = document.createElement("input");
        newAssignButton.type = "button";
        newAssignButton.classList.add("button", "btn");
        newAssignButton.classList.add("button", "btn-info");
        newAssignButton.value = "Export";
        newAssignButton.addEventListener("click",
            function () {
                chosenTest = tests[test].id;
                testName = tests[test].name;
                exportModalPopUp();
               
               
            });
        newTableCellButton.appendChild(newAssignButton);
        newElement.appendChild(newTableCellButton);

        table.appendChild(newElement);
    }

    tableDiv.appendChild(table);
}




function exportModalPopUp() {
     console.log(chosenTest);
    
     getTest(chosenTest).then( (csv) => {

    var text = csv.body;
    var encodedUri = encodeURI(text);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    let filename = testName+".csv"
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();

     })
 
}

function mainPanel() {
    window.open("recruiterMain.html", "_self");
}