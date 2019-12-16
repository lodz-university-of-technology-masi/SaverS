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
  function sendTest(test) {
    console.log(JSON.stringify(test));
    return new Promise((resolve, reject) => {
        $.ajax({
          type: 'PUT',
          url: 'https://x3vqos9dhc.execute-api.us-east-1.amazonaws.com/testJJ/uploadresult',
          headers: {
            "Authorization": getToken(),
            "Content-Type": "application/json"
        },
          data: JSON.stringify(test),
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
 

$(document).ready( function() {

 getJsonData().then(
   () => {
  //$('#alert_placeholder').html('<div class="alert"><a class="close" data-dismiss="alert">×</a><span>'+test.questions[1].content+'</span></div>')

  var testDIV = document.getElementById("placeholder");
  const app = $("#test");

  for(let i in test.questions){

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

  
    if (test.questions[i].answers == "|"){
      
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
  
      for (let j in test.questions[i].answers){
        var checkBoxDiv = document.createElement("div");
        checkBoxDiv.classList.add("div", "form-check");

        var checkboxInput = document.createElement("input");
        checkboxInput.classList.add("input", "form-check-input");
        checkboxInput.type = "checkbox";
        checkboxInput.id="check"+j;
        var label = document.createElement("answ");
        label.classList.add("label", "form-check-label");
        label.id = "label"+j;
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
   }
 );

});
// let zapiszTest;
// const ans = $('#answers')
let answerJson;
    zapiszTest = () => {
    //   x = document.getElementById("1").value;
    

    // answerJson=test;
    
    let arr = {}
    let answer;
    // console.log(answerJson)
      for (let i in test.questions) {
        if (test.questions[i].answers == "|"){
          // console.log(document.getElementById(i).value)
          userAnswer = document.getElementById(i).value;
          console.log(userAnswer)
        ans.append(document.getElementById(i).value+"<br>")
        arr[i] = {
          'id':test.questions[i].id,
          'type': test.questions[i].type,
          'content': test.questions[i].content,
          'answers': test.questions[i].answers,
          'userAnswers': userAnswer
      };
      }
        else
        {
          let answerArr = [];
          for (let j in test.questions[i].answers){
          if(document.getElementById("check"+j).checked){
            console.log("checked")
            console.log(document.getElementById("label"+j).textContent)
            answerArr.push(document.getElementById("label"+j).textContent)
          }
        ans.append(document.getElementById("check"+j).checked+"<br>")  
          
      }
      arr[i] = {
        'id':test.questions[i].id,
        'type': test.questions[i].type,
        'content': test.questions[i].content,
        'answers': test.questions[i].answers,
        'userAnswers': answerArr
    };
  }
        // app.append("<input id=" + i + " type=checkBox>" + ans + "</input>");
      }
      // console.log(answerJson)

      // console.log(arr)
      answerJson={
        'userName': getUserName(),
        'clientId': userPool.clientId,
        'test': test,
        'questions': arr,
        'resolved': "locked"
      };
      // console.log(answerJson)
      sendTest(answerJson);
    };
