const urlParams = new URLSearchParams(window.location.search);
const testID = urlParams.get('id');
let questionList = [];
let answerCounter = 0;
let questionCounter = 1;
let test;

$(document).ready(function() {

getTest().then(  
    () =>  {
        for (let question in test.questions) {
            questionList.push(test.questions[question]);
            console.log(questionList);
        }
        updateTable();
        let testName = document.getElementById("testName");
        testName.value = test.name;

        let language = document.getElementById("language");
        language.value = test.lang;

    });

$("#type").change(function() {

  var el = $(this);
  let answers = document.getElementById("answersPanel");

  if(("W".localeCompare(el.val().toString())) == 0) {

    createAddAnswerButton();

    for (answerCounter = 1; answerCounter <= 2; answerCounter++) {
        createAnswerForm(answerCounter);
    }

  }
  else {
    while (answers.firstChild) {
         answers.removeChild(answers.firstChild);
     }
  }
});

function getTest() {
    return new Promise((resolve, reject) => {
        $.ajax({
        url: `https://dj9pgircgf.execute-api.us-east-1.amazonaws.com/SaversAPI/test/${testID}`,
        type: "GET",
        async: false,
        success: data => {
            console.log(data);
            test = JSON.parse(data.body);
            return resolve()
        },
        error: err => {
            console.log(err.responseJSON);
            return reject(err.responseText)
        }
        })
    })
}


function createAddAnswerButton() {

    var answers = document.getElementById("answersPanel");

    var br = document.createElement("br");
    answers.appendChild(br);

    var button = document.createElement("button");
    button.classList.add("btn", "btn-success");
    var text = document.createTextNode("Add answer");
    button.appendChild(text);
    button.onclick = function() {
        if (answerCounter<6) {
            createAnswerForm(answerCounter)
            answerCounter++;
        }
    };
    answers.appendChild(button);

    var br = document.createElement("br");
    answers.appendChild(br);
}

function createAnswerForm(num) {

    var answers = document.getElementById("answersPanel");

    var answerDiv = document.createElement("div");
    answerDiv.classList.add("div", "input-group-prepend");
    
    var answer1Span = document.createElement("span");
    answer1Span.classList.add("span", "input-group-text");
    var answer1text = document.createTextNode("Answer " + num);
    answer1Span.appendChild(answer1text);
    answerDiv.appendChild(answer1Span);
    
    var answer1 = document.createElement("input");
    answer1.classList.add("form", "form-control");
    answer1.id = "answer" + num;
    answerDiv.appendChild(answer1);

    var br = document.createElement("br");
    answers.appendChild(br);
    answers.appendChild(answerDiv);
}

});    

function createQuestion() {
    var content = $("#content");
    var type = $("#type");
    let ourAnswers = [];

    if (("W".localeCompare(type.val().toString())) == 0) {
        var i;
        for (i = 1; i < answerCounter; i++) {
            var ourAnswer = $("#answer" + i);
            ourAnswers.push(ourAnswer.val());
        }
    }
    else {
        ourAnswers.push("|");
    }

    let newQuestionItem = {
        id: questionCounter,
        type: type.val(),
        content: content.val(),
        answers: ourAnswers,
    };

    questionList.push(newQuestionItem);

    var counter = 1;
    for (let question in questionList) {
        questionList[question].id = counter;
        counter++; 
    }

    updateTable();
    questionCounter++;
}

function updateTable() {
    let tableDiv = document.getElementById("questionTable");

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
    let firstRowNameText = document.createTextNode("Id");
    firstRowName.appendChild(firstRowNameText);
    firstRow.appendChild(firstRowName);

    let firstRowDesc = document.createElement("td");
    let firstRowDescText = document.createTextNode("Question");
    firstRowDesc.appendChild(firstRowDescText);
    firstRow.appendChild(firstRowDesc);

    let firstRowPlace = document.createElement("td");
    let firstRowPlaceText = document.createTextNode("Type");
    firstRowPlace.appendChild(firstRowPlaceText);
    firstRow.appendChild(firstRowPlace);

    let firstRowAnswers = document.createElement("td");
    let firstRowAnswersText = document.createTextNode("Answers");
    firstRowAnswers.appendChild(firstRowAnswersText);
    firstRow.appendChild(firstRowAnswers);

    let firstRowDelete = document.createElement("td");
    let firstRowDeleteText = document.createTextNode("Delete");
    firstRowDelete.appendChild(firstRowDeleteText);
    firstRow.appendChild(firstRowDelete);

    table.appendChild(firstRow);

    for (let question in questionList) {

        let newElement = document.createElement("tr");

        //add id table cell
        let newTableCellId = document.createElement("td");
        let newContentId = document.createTextNode(questionList[question].id);
        newTableCellId.appendChild(newContentId);
        newElement.appendChild(newTableCellId);

        //add question table cell
        let newTableCellQuestion = document.createElement("td");
        let newContentQuestion = document.createTextNode(questionList[question].content);
         newTableCellQuestion.appendChild(newContentQuestion);
        newElement.appendChild(newTableCellQuestion);

        //add type table cell
        let newTableCellType = document.createElement("td");
        let newContentType;
        if(("W".localeCompare(questionList[question].type.toString())) == 0) {
            newContentType = document.createTextNode("Multiple choice");
        }
        else if (("O".localeCompare(questionList[question].type.toString())) == 0) {
            newContentType = document.createTextNode("Open");
        }
        else if (("L".localeCompare(questionList[question].type.toString())) == 0) {
            newContentType = document.createTextNode("Number question");
        }
        newTableCellType.appendChild(newContentType);
        newElement.appendChild(newTableCellType);

        //add answers table cell
        let newTableCellAnswers = document.createElement("td");
        let newContentAnswers;
        if (("O".localeCompare(questionList[question].type.toString()) == 0 ||
         ("L".localeCompare(questionList[question].type.toString())) == 0)) {
            newContentAnswers = document.createTextNode("No answers");
        }
        else if(("W".localeCompare(questionList[question].type.toString())) == 0) {
            newContentAnswers = document.createTextNode(questionList[question].answers.toString().split(",").join(", "));
        }
        newTableCellAnswers.appendChild(newContentAnswers);
        newElement.appendChild(newTableCellAnswers);

        //add delete button cell
        let newTableCellButton = document.createElement("td");
        let newDeleteButton = document.createElement("input");
        newDeleteButton.type = "button";
        newDeleteButton.classList.add("btn","btn-sm", "btn-danger");
        newDeleteButton.value = "X";
        newDeleteButton.addEventListener("click",
            function () {
                deleteQuestion(question);
            });
        newTableCellButton.appendChild(newDeleteButton);
        newElement.appendChild(newTableCellButton);

        table.appendChild(newElement);
    }

    tableDiv.appendChild(table);
}

let deleteQuestion = function (index) {
    questionList.splice(index, 1);
    var counter = 1;
    for (let question in questionList) {
        questionList[question].id = counter;
        counter++; 
    }
    updateTable();
}

function updateTest() {
    
    let username = getUserName();
    let testName = document.getElementById("testName");
    let language = document.getElementById("language");

    test.name = testName.value;
    test.lang = language.value;
    test.questions = questionList;

    var check = checkFields();

    if(check) {
        showSpinner();
    sendTest(test).then(
        result => {
            hideSpinner();
            console.log(result)
            let textDiv = document.getElementById("subTestDiv");
            let text = document.createTextNode("Success, redirecting to main panel");
            textDiv.appendChild(text);
            setTimeout(function(){
                window.open("../recruiterMain.html", "_self");
            }, 2000);
        },
        reject => {
            console.log(reject)
        }
    )
    }
}

function sendTest(test) {
    console.log(JSON.stringify(test));
    return new Promise((resolve, reject) => {
        $.ajax({
          type: 'PUT',
          url: 'https://dj9pgircgf.execute-api.us-east-1.amazonaws.com/SaversAPI/test',
          data: JSON.stringify(test),
          contentType: 'application/json',
          success: data => {
            return resolve(data)
          },
          error: err => {
            return reject(err.responseText)
          }
        });
    });
  };

function checkFields() {
    let testName = document.getElementById("testName");
    let size = 0;
    var emptyAnswer = false;
    var emptyName = false;

    for (let question in questionList) {
        if(questionList[question].content === "") {
            emptyName = true;
        }
        if(questionList[question].type === "W") {
            for(let answer in questionList[question].answers) {
                if(questionList[question].answers[answer] === "" )
                emptyAnswer = true;
            }
        }
        size++; 
    }

    if (testName.value === "" || emptyName) {
        $('#warnEmpty').modal('show');
        return false;
    } else if (size === 0) {
        $('#warnNoQuestion').modal('show');
        return false;
    } else if(emptyAnswer) {
        $('#warnEmptyAnswer').modal('show');
        return false;
    }
    return true;   
}

function managePanel() {
    window.open("./manageTests.html", "_self");
  }

  function showSpinner() {
    s = document.getElementById("spinner");
    s.style.display = "block";
  }
  function hideSpinner() {
    s = document.getElementById("spinner");
    s.style.display = "none";
  }