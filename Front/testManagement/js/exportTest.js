const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');

let chosenTest;

getTests().then(incomingTests => {
    updateTable(incomingTests.tests);
  });
  
  //Download all test for recruiter
  function getTests() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `https://dj9pgircgf.execute-api.us-east-1.amazonaws.com/SaversAPI/tests/${myParam}`,
        type: "GET",
        success: data => {
          console.log(JSON.parse(data.body).message[0]);
          return resolve(JSON.parse(data.body));
        },
        error: err => {
          console.log(err.responseJSON);
        }
      });
    });
  }


function getExportedTest(testID) {
    return new Promise((resolve, reject) => {
    $.ajax({
        method: 'GET',
        url: `https://6g43np9o2g.execute-api.us-east-1.amazonaws.com/SaversAPIFinal/test/export/${testID}`,
        success: (data) => {
            console.log(data);
            return resolve(data)
        },
        error: (err) => {
            return reject(err.responseText)
        }
    });
})}

function updateTable(tests) {
    let tableDiv = document.getElementById("testTable");
    //remove all elements
    while (tableDiv.firstChild) {
        tableDiv.removeChild(tableDiv.firstChild);
    }
    // console.log(tests)
    if(tests.length==0) {
      let text = document.createTextNode("You haven't created any tests so far.");
      let h5 = document.createElement("h5");
      h5.classList.add("text-center");
      h5.appendChild(text)
      tableDiv.appendChild(h5);
      return;
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
    showSpinner();
    $("#exportModal").modal({ backdrop: "static", keyboard: false });
     console.log(chosenTest);
    
     getExportedTest(chosenTest).then( (csv) => {
        console.log(csv.body.replace(/"/g,''));
    var text = csv.body.replace(/"/g,'')+"\n";
    var encodedUri = encodeURI(text);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    let filename = testName+".csv"
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    $("#modal-body").empty();
    hideSpinner(); 
        returnMessage("Test exported");
        returnMessage(`And saved under name \`${filename}\``);
        link.click();
        setTimeout(function() {
          $("#exportModal").modal("hide");
        }, 2000);
     })
 
}

function mainPanel() {
    window.open("recruiterMain.html", "_self");
}

//Spinner Functions
function showSpinner() {
    s = document.getElementById("spinner");
    s.style.display = "block";
  }
  function hideSpinner() {
    s = document.getElementById("spinner");
    s.style.display = "none";
  }

  function returnMessage(message) {
    var modal = document.getElementById("modal-body");
    var p = document.createElement("p");
    var content = document.createTextNode(message);
    p.appendChild(content);
    modal.appendChild(p);
  }

  function managePanel() {
    window.open("./manageTests.html", "_self");
  }
  