let test;
let checking = true;
const ans = $('#answers');

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');
console.log(myParam);
function getJsonData() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://dj9pgircgf.execute-api.us-east-1.amazonaws.com/SaversAPI/test/${myParam}`,
      type: "GET",
      headers: {
        "Authorization": getToken()
    },
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
};
function getEvaluatedTest(id) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://dj9pgircgf.execute-api.us-east-1.amazonaws.com/SaversAPI/answer/${id}`,
      type: "GET",
      headers: {
        "Authorization": getToken()
    },
      success: data => {
        
        console.log(JSON.parse(data.body));

        return resolve(data);
      },
      error: err => {
        console.log(err.responseJSON);
        return reject(err.responseText)
      }
    })
  })
};


$(document).ready(function () {

  getJsonData().then(
    () => {
      hideSpinner();

    
      var testDIV = document.getElementById("placeholder");
      const app = $("#test");

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
        }
        else {

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
    
      zapiszTest();
    }
  );

});

// Tutaj zaczyna się mójkod - prosze nie grzebać - z wyrazami wdzięczności Mateusz Walczak ;)

let answerJson;
zapiszTest = () => {
  let answers = [];
  for (let i in test.questions) {
    if (test.questions[i].answers == "|") {
      userAnswer = document.getElementById(i).value;
      answers[i] = userAnswer;
    }
    else {
      let answerArr = [];
      let answerString = "";

      for (let j in test.questions[i].answers) {
        if (document.getElementById("check" + j).checked) {
          answerArr.push(document.getElementById("label" + j).textContent)
        }
      }

      for (let ans in answerArr) {
        answerString += answerArr[ans];
        if (ans < answerArr.length - 1) {
          answerString += ";";
        }
      }
      answers[i] = answerString;
    }
  }

  answerJson = {
    'answers': answers,
    'candidate': getUserName(),
    'points': -1,
    'recruiter': test.recruiter,
    'test': test,
  };
  sendAnswers();
};

function sendAnswers() {
  $.ajax({
    type: 'POST',
    url: 'https://dj9pgircgf.execute-api.us-east-1.amazonaws.com/SaversAPI/answer',
    data: JSON.stringify(answerJson),
    headers: {
      "Authorization": getToken()
  },
    contentType: 'application/json',
    success: data => {
      console.log(data);
      let body = JSON.parse(data.body);
      if (!checking) {
        if (body.message[0] == "Data is incorrect") {
          $('#alreadyAnsweredModal').modal('show');
          let errorText = document.getElementById("errorText");
          while (errorText.firstChild) {
            errorText.removeChild(errorText.firstChild);
          }    
          let newText = document.createTextNode(body.message[0] + " - " + body.message[1]);
          errorText.appendChild(newText);
        }
      }
      if (body.message[0] == "This test is solved or evaluated") {
        evalID = getUserName() + "-" + test.id;
        // console.log(evalID);
        getEvaluatedTest(evalID).then( (eval) => {
          if (eval.statusCode == 200) {
           let evaluatedTest = JSON.parse(eval.body);
           console.log(evaluatedTest);
           let points = evaluatedTest.points;
           let totalPoints = evaluatedTest.test.questions.length;
           scoreText = `Your score is ${points} out of ${totalPoints}`;
           console.log(scoreText)
           $('#alreadyAnsweredModal').modal('show');
           let errorText = document.getElementById("errorText");
           while (errorText.firstChild) {
             errorText.removeChild(errorText.firstChild);
           }    
           let newText = document.createTextNode(body.message + "! "+scoreText);
           errorText.appendChild(newText);
          }
        }) 
       
      }
      if (body.message[0] == "Data is correct") {
        let textDiv = document.getElementById("textDiv");
        let text = document.createTextNode("Success, redirecting to main panel");
        textDiv.appendChild(text);
        setTimeout(function(){
          window.open("../candidateMain.html", "_self");;
        }, 2000);
      }
      checking = false;
    },
    error: err => {
      console.log(err.responseText);
    }
  });
}

function mainPanel() {
  window.open("../candidateMain.html", "_self");
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