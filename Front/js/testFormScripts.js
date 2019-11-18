let questionList = [];
let answerCounter = 0;
let questionCounter = 1;

$(document).ready(function() {

$("#type").change(function() {

  var el = $(this);
  let answers = document.getElementById("answersPanel");

  if(("choice".localeCompare(el.val().toString())) == 0) {

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

    if (("choice".localeCompare(type.val().toString())) == 0) {
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
        question: content.val(),
        answers: ourAnswers,
    };

    questionList.push(newQuestionItem);
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
    table.classList.add("table", "table-bordered");
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
        let newContentQuestion = document.createTextNode(questionList[question].question);
         newTableCellQuestion.appendChild(newContentQuestion);
        newElement.appendChild(newTableCellQuestion);

        //add type table cell
        let newTableCellType = document.createElement("td");
        let newContentType = document.createTextNode(questionList[question].type);
        newTableCellType.appendChild(newContentType);
        newElement.appendChild(newTableCellType);

        //add answers table cell
        let newTableCellAnswers = document.createElement("td");
        let newContentAnswers = document.createTextNode(questionList[question].answers.toString().split(",").join(", "));
        newTableCellAnswers.appendChild(newContentAnswers);
        newElement.appendChild(newTableCellAnswers);

        //add delete button cell
        let newTableCellButton = document.createElement("td");
        let newDeleteButton = document.createElement("input");
        newDeleteButton.type = "button";
        newDeleteButton.classList.add("button", "btn-light");
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
    updateTable();
}