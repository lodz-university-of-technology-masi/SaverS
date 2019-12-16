
// let test=incoming.test;

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('userID');
const myParam1 = urlParams.get('testID');
console.log("userID",myParam);
console.log("testID",myParam1);
  function getJsonData() {
    return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://x3vqos9dhc.execute-api.us-east-1.amazonaws.com/testJJ/getTestForCheck?userID=${myParam}&testID=${myParam1}`,
      type: "GET",
      success: data => {
        console.log(data);
        test = data.Items[0];
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
  function updateScore(scoreData) {
    console.log(JSON.stringify(scoreData));
    return new Promise((resolve, reject) => {
        $.ajax({
          type: 'PUT',
          url: 'https://x3vqos9dhc.execute-api.us-east-1.amazonaws.com/testJJ/updateScore',
          data: JSON.stringify(scoreData),
          contentType: 'application/json',
          success: data => {
            console.log(data);
            return resolve(data)
          },
          error: err => {
            return reject(err.responseText)
          }
        });
    });
  };

let correctAnswer
let incorrectAnswer
$(document).ready( function() {

 getJsonData().then(
   () => {
  //$('#alert_placeholder').html('<div class="alert"><a class="close" data-dismiss="alert">×</a><span>'+test.questions[1].content+'</span></div>')

  var testDIV = document.getElementById("placeholder");
  const app = $("#test");

  for(let i in test.questions){

    //creating p with question
    var questionDiv = document.createElement("p");
    questionDiv.classList.add("alert", "alert-warning");
    questionDiv.classList.add("role", "alert");
    questionDiv.id=`answer${i}`;

    //creating test node with question
    var questionText = document.createTextNode(test.questions[i].content); 
    questionDiv.appendChild(questionText);

    //separator
    var p = document.createElement("p");

    testDIV.appendChild(questionDiv);
    testDIV.appendChild(p);

  
    if (test.questions[i].answers == "|"){
      
      var answerDiv = document.createElement("div");
      answerDiv.classList.add("div", "input-group-prepend");
      
      var answSpan = document.createElement("span");
      answSpan.classList.add("span", "input-group-text");
      var answText = document.createTextNode("Answer");
      answSpan.appendChild(answText);
      answerDiv.appendChild(answSpan);
      
      var answ = document.createElement("span");
      answ.classList.add("span", "input-group-text");
      answ.appendChild(document.createTextNode(test.questions[i].userAnswers))
      answerDiv.appendChild(answ);
  
    //   var b = document.createElement("br");
    //   testDIV.appendChild(b);
      testDIV.appendChild(answerDiv);
    //   testDIV.appendChild(b);
    
    }
    else {
  
      for (let j in test.questions[i].answers){
        var checkBoxDiv = document.createElement("div");
        checkBoxDiv.classList.add("div", "form-check");

        var checkboxInput = document.createElement("input");
        checkboxInput.classList.add("input", "form-check-input");
        checkboxInput.type = "checkbox";
        checkboxInput.id="check"+j;
        checkboxInput.disabled=true;
        var label = document.createElement("answ");
        label.classList.add("label", "form-check-label");
        label.id = "label"+j;
        var labelText = document.createTextNode(test.questions[i].answers[j]);
        label.appendChild(labelText);
      
            for( x of test.questions[i].userAnswers)
            {
                // console.log(x)
            if(x === test.questions[i].answers[j])
            {
                // console.log(x)
            checkboxInput.checked=true;
            }
        }
       
        checkBoxDiv.appendChild(checkboxInput);
        checkBoxDiv.appendChild(label);

        testDIV.appendChild(checkBoxDiv);
      }

  }
  var inCorrectButton = document.createElement("button");
  let id = `inCorrectButton${i}`
  inCorrectButton.id=id;
  inCorrectButton.classList.add("btn", "btn-outline-danger");
  inCorrectButton.type = "button";
  inCorrectButton.setAttribute("onclick",`incorrectAnswer(${i})`)
  inCorrectButton.appendChild(document.createTextNode("Incorrect"))

  var correctButton = document.createElement("button");
  id = `correctButton${i}`
  correctButton.id=id;
  correctButton.classList.add("btn", "btn-outline-success");
  correctButton.type = "button";
  correctButton.setAttribute("onclick",`correctAnswer(${i})`)
  correctButton.appendChild(document.createTextNode("Correct"))

  testDIV.appendChild(correctButton)
  testDIV.appendChild(inCorrectButton)
  
}
correctAnswer = (i) => {
    // console.log("Correct Answer "+i)
    let ans=document.getElementById(`answer${i}`)
    // console.log(ans)
    ans.classList.remove("incorrect")
    ans.classList.add("correct")
    let corBut = document.getElementById(`correctButton${i}`)
    corBut.classList.remove("btn-outline-success")
    corBut.classList.add("btn-success")
    let incBut = document.getElementById(`inCorrectButton${i}`)
    incBut.classList.remove("btn-danger")
    incBut.classList.add("btn-outline-danger")


}
incorrectAnswer = (i) => {
    // console.log("Incorrect Answer "+i)
    let ans=document.getElementById(`answer${i}`)
    let but=document
    // console.log(ans)
    ans.classList.add("incorrect")
    ans.classList.remove("correct")
    let corBut = document.getElementById(`correctButton${i}`)
    corBut.classList.add("btn-outline-success")
    corBut.classList.remove("btn-success")
    let incBut = document.getElementById(`inCorrectButton${i}`)
    incBut.classList.add("btn-danger")
    incBut.classList.remove("btn-outline-danger")

}
   }
 );

});
// let zapiszTest;
const ans = $('#answers')
let answerJson;
    zapiszTest = () => {
        let score = 0;
        let total = 0;
    console.log("Submit answers")
    for(let i in test.questions){
        total++
        let ans = document.getElementById(`answer${i}`)
        // console.log(ans)
        if(ans.classList.contains(`correct`))
            score++
    }
    let scoreData = 
      {
        "clientId": myParam,
        "testId": myParam1,
        "score": score,
        "resolved": "true"
      }
    
    console.log(`Score is ${score}/${total}`)
    updateScore(scoreData);
    };