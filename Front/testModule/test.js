
let test;
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
  let zapiszTest;
$(document).ready( function() {

 getJsonData().then(
   () => {
    const app = $("#test");
    for (let i in test.questions) {
      app.append("<p>" + test.questions[i].content + "</p>");
      if (test.questions[i].answers == "|")
        app.append("<input id=" + i + ">" + "</input>");
      else
        // console.log(ans)
        for (let j in test.questions[i].answers)
          app.append("<input id=check"  + j + " type=checkBox>" + test.questions[i].answers[j] + "</input>");
    }
    const ans = $('#answers')
    zapiszTest = () => {
    //   x = document.getElementById("1").value;
    
      for (let i in test.questions) {
        if (test.questions[i].answers == "|"){
          console.log(document.getElementById(i).value)
        ans.append(document.getElementById(i).value+"<br>")
        }
        else
          // console.log(ans)
          for (let j in test.questions[i].answers){
          console.log(document.getElementById("check"+j).checked)
        ans.append(document.getElementById("check"+j).checked+"<br>")  
        }
            // app.append("<input id=" + i + " type=checkBox>" + ans + "</input>");
      }
    };
   }
 );

});
