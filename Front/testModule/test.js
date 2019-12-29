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
      success: data => {
        console.log(data);
        test = JSON.parse(data.body);
        return resolve()
        // updateTodoList();
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
      //$('#alert_placeholder').html('<div class="alert"><a class="close" data-dismiss="alert">×</a><span>'+test.questions[1].content+'</span></div>')

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

            // app.append("<input id=check"  + j + " type=checkBox>" + test.questions[i].answers[j] + "</input>");
          }
          var br = document.createElement("br");
          testDIV.appendChild(br);
        }
      }
      // testDIV.appendChild(QA);

      /*
        for (let i in test.questions) {
            //app.append("<p>" + test.questions[i].content + "</p>");
          if (test.questions[i].answers == "|")
            app.append("<input id=" + i + ">" + "</input>");
          else
            // console.log(ans)
            for (let j in test.questions[i].answers)
              app.append("<input id=check"  + j + " type=checkBox>" + test.questions[i].answers[j] + "</input>");
        }
        */

      // const ans = $('#answers')
      // zapiszTest = () => {
      // //   x = document.getElementById("1").value;

      //   for (let i in test.questions) {
      //     if (test.questions[i].answers == "|"){
      //       console.log(document.getElementById(i).value)
      //     ans.append(document.getElementById(i).value+"<br>")
      //     }
      //     else
      //       // console.log(ans)
      //       for (let j in test.questions[i].answers){
      //       console.log(document.getElementById("check"+j).checked)
      //     ans.append(document.getElementById("check"+j).checked+"<br>")  
      //     }
      //         // app.append("<input id=" + i + " type=checkBox>" + ans + "</input>");
      //   }
      // };
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
        $('#alreadyAnsweredModal').modal('show');
        let errorText = document.getElementById("errorText");
        while (errorText.firstChild) {
          errorText.removeChild(errorText.firstChild);
        }    
        let newText = document.createTextNode(body.message + "! You will find your results here when the test will be checked.");
        errorText.appendChild(newText);
      }
      if (body.message[0] == "Data is correct") {
        let textDiv = document.getElementById("textDiv");
        let text = document.createTextNode("Succes, redirecting to main panel");
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

