const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("recruiterId");
let testTranslated;
getTests().then(incomingTests => {
  updateTable(incomingTests.tests);
});

// Function sending translatedTest to DB
function sendTest(test) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url:
        "https://dj9pgircgf.execute-api.us-east-1.amazonaws.com/SaversAPI/test",
      data: JSON.stringify(test),
      contentType: "application/json",
      success: data => {
        data = {
          message: JSON.parse(data.body).message[0],
          statusCode: data.statusCode
        };
        return resolve(data);
      },
      error: err => {
        return reject(err.responseText);
      }
    });
  });
}
//Download all test for recruiter
function getTests() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://dj9pgircgf.execute-api.us-east-1.amazonaws.com/SaversAPI/tests/${myParam}`,
      type: "GET",
      async: false,
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

//Function sends test to backend for translation and returns translated test
function translateTest(test) {
  // console.log(JSON.stringify(test));
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url:
        "https://6g43np9o2g.execute-api.us-east-1.amazonaws.com/SaversAPIFinal/translatetest",
      data: JSON.stringify(test),
      contentType: "application/json",
      success: data => {
        console.log(data);

        return resolve(data);
      },
      error: err => {
        return reject(err.responseText);
      }
    });
  });
}

// Update table with tests
function updateTable(tests) {
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

  let firstRowLang = document.createElement("td");
  let firstRowLangText = document.createTextNode("Lang");
  firstRowLang.appendChild(firstRowLangText);
  firstRow.appendChild(firstRowLang);

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
    let newContentQuestionNumber = document.createTextNode(
      tests[test].questions.length
    );
    newTableCellQuestionNumber.appendChild(newContentQuestionNumber);
    newElement.appendChild(newTableCellQuestionNumber);

    //Add lang of test
    let newTableCellLang = document.createElement("td");
    let newContentLang = document.createTextNode(
      tests[test].lang
    );
    newTableCellLang.appendChild(newContentLang);
    newElement.appendChild(newTableCellLang);


    //add Translate button cell
    let newTableCellButton = document.createElement("td");
    let newAssignButton = document.createElement("input");
    newAssignButton.type = "button";
    newAssignButton.classList.add("button", "btn");
    newAssignButton.classList.add("button", "btn-info");
    newAssignButton.value = "Translate";
    newAssignButton.addEventListener("click", function() {
      testToSend = tests[test];
      translateModalPopUp(testToSend);
    });
    newTableCellButton.appendChild(newAssignButton);
    newElement.appendChild(newTableCellButton);

    table.appendChild(newElement);
  }

  tableDiv.appendChild(table);
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

function translateModalPopUp(testToSend) {
  var e = document.getElementById("lang-select");
  var selectedLang = e.options[e.selectedIndex].value;
  let t = {
    test: testToSend,
    targetLang: selectedLang
  };
  showSpinner();
  $("#assignModal").modal({ backdrop: "static", keyboard: false });
  //  console.log(testToSend)
  translateTest(t).then(test => {
    hideSpinner();
    testTranslated = JSON.parse(test.body);
    createModalWithTest(JSON.parse(test.body));
  });
}

function createModalWithTest(test) {
  var testDIV = document.getElementById("test");
  for (let i in test.questions) {
    //creating alert with question
    var questionDiv = document.createElement("q1");
    questionDiv.classList.add("alert", "alert-warning");
    questionDiv.classList.add("role", "alert");

    //creating test node with question
    var questionText = document.createTextNode(test.questions[i].content);
    questionDiv.appendChild(questionText);

    //separator
    var p = document.createElement("p");

    testDIV.appendChild(questionDiv);
    testDIV.appendChild(p);

    if (test.questions[i].answers == "|") {
      var answerDiv = document.createElement("div");
      answerDiv.classList.add("div", "input-group-prepend");

      var answSpan = document.createElement("span");
      answSpan.classList.add("span", "input-group-text");
      var answText = document.createTextNode("Answer");
      answSpan.appendChild(answText);
      answerDiv.appendChild(answSpan);

      var answ = document.createElement("input");
      answ.classList.add("form", "form-control");
      answ.id = i;
      answerDiv.appendChild(answ);

      var b = document.createElement("br");
      testDIV.appendChild(b);
      testDIV.appendChild(answerDiv);
      testDIV.appendChild(b);
    } else {
      for (let j in test.questions[i].answers) {
        var checkBoxDiv = document.createElement("div");
        checkBoxDiv.classList.add("div", "form-check");

        var checkboxInput = document.createElement("input");
        checkboxInput.classList.add("input", "form-check-input");
        checkboxInput.type = "checkbox";
        checkboxInput.id = "check" + j;
        var label = document.createElement("answ");
        label.classList.add("label", "form-check-label");
        label.id = "label" + j;
        var labelText = document.createTextNode(test.questions[i].answers[j]);
        label.appendChild(labelText);

        checkBoxDiv.appendChild(checkboxInput);
        checkBoxDiv.appendChild(label);

        testDIV.appendChild(checkBoxDiv);
      }
      var br = document.createElement("br");
      testDIV.appendChild(br);
    }
  }
  // No button
  var inCorrectButton = document.createElement("button");
  let id = `inCorrectButton`;
  inCorrectButton.id = id;
  inCorrectButton.classList.add("btn", "btn-outline-danger");
  inCorrectButton.type = "button";
  inCorrectButton.setAttribute("onclick", `dismiss()`);
  inCorrectButton.setAttribute("aria-label", `Close`);
  inCorrectButton.appendChild(document.createTextNode("No"));
  testDIV.appendChild(inCorrectButton);

  // Yes button
  var correctButton = document.createElement("button");
  id = `correctButton`;
  correctButton.id = id;
  correctButton.classList.add("btn", "btn-outline-success");
  correctButton.type = "button";
  correctButton.setAttribute("onclick", `accept(test)`);
  correctButton.appendChild(document.createTextNode("Yes"));
  testDIV.appendChild(correctButton);
  
}
function mainPanel() {
  window.open("recruiterMain.html", "_self");
}
function returnMessage(message) {
  var testDIV = document.getElementById("test");
  var p = document.createElement("p");
  var content = document.createTextNode(message);
  p.appendChild(content);
  testDIV.appendChild(p);
}
accept = () => {
  let corBut = document.getElementById(`correctButton`);
  corBut.classList.remove("btn-outline-success");
  corBut.classList.add("btn-success");
  let incBut = document.getElementById(`inCorrectButton`);
  incBut.classList.remove("btn-danger");
  incBut.classList.add("btn-outline-danger");
  delete testTranslated.id;
  console.log(testTranslated);
  $("#test").empty();
  showSpinner();
  sendTest(testTranslated).then(
    result => {
      hideSpinner();
      returnMessage(result.message);
      returnMessage("And has been added to the database");
      setTimeout(function() {
        $("#assignModal").modal("hide");
      }, 2000);
    },
    reject => {
      console.log(reject);
    }
  );
};

dismiss = () => {
  let corBut = document.getElementById(`correctButton`);
  corBut.classList.add("btn-outline-success");
  corBut.classList.remove("btn-success");
  let incBut = document.getElementById(`inCorrectButton`);
  incBut.classList.add("btn-danger");
  incBut.classList.remove("btn-outline-danger");
  setTimeout(function() {
    $("#assignModal").modal("hide");
    $("#test").empty();
  }, 1000);
};

function managePanel() {
  window.open("./manageTests.html", "_self");
}
