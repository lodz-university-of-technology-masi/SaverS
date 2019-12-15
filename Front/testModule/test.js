let test;
const ans = $('#answers');


const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');
console.log(myParam);
function getJsonData() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://x3vqos9dhc.execute-api.us-east-1.amazonaws.com/TestAPIv2/test/${myParam}`,
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
            checkboxInput.checked = false;
            checkboxInput.id = j;

            console.log("idcheckbox" + checkboxInput.id);

            var label = document.createElement("answ");
            label.classList.add("label", "form-check-label");
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
    }
  );
});
let zapiszTest = function () {
  for (let i in test.questions) {
    if (test.questions[i].answers == "|") {
      console.log(document.getElementById(i).value)
      ans.append(document.getElementById(i).value + "<br>")
    }
    else
      for (let j in test.questions[i].answers) {
        console.log(document.getElementById(j).checked)
        ans.append(document.getElementById(j).checked + "<br>")
      }
  }
}