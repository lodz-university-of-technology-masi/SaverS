const myParam = getUserName();
let testID;
let assigns;
let tests = [];
let test;
getAssigns();
assigns = assigns.attributions;
createTestButtons();

function getEvaluatedTest(id) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://dj9pgircgf.execute-api.us-east-1.amazonaws.com/SaversAPI/answer/${id}`,
      type: "GET",
      success: data => {
        
        // console.log(JSON.parse(data.body));
        return resolve(data);
      },
      error: err => {
        console.log(err.responseJSON);
        return reject(err.responseText)
      }
    })
  })
};
function getAssigns() {
    $.ajax({
      url: `https://dj9pgircgf.execute-api.us-east-1.amazonaws.com/SaversAPI/attribution/candidate/${myParam}`,
      type: "GET",
      async: false,
      success: data => {
        // console.log(data);
        assigns = JSON.parse(data.body);
        // console.log(assigns)
      },
      error: err => {
        console.log(err.responseJSON);
      }
    })
}

function getTest() {
    $.ajax({
      url: `https://dj9pgircgf.execute-api.us-east-1.amazonaws.com/SaversAPI/test/${testID}`,
      type: "GET",
      async: false,
      success: data => {
        // console.log(data);
        test = JSON.parse(data.body);
       
      },
      error: err => {
        console.log(err.responseJSON);
      }
    })
}

function createTestButtons() {
    for (let assign in assigns) {
        testID = assigns[assign].testID;
        getTest();
        test = {
          test: test,
          state: assigns[assign].state
        }
        tests[assign] = test;
    }
    console.log(tests);

    let tableDiv = document.getElementById("testsdiv");

    while (tableDiv.firstChild) {
        tableDiv.removeChild(tableDiv.firstChild);
    }

    for (let currentTest in tests) {
        let newButton = document.createElement("button");
        newButton.type = "button";
        newButton.classList.add("button", "btn");
        let newButtonText = document.createTextNode(tests[currentTest].test.name);
        newButton.appendChild(newButtonText);
        if(tests[currentTest].state==0){
          // Przypisany
          newButton.classList.add("button", "btn-outline-success");
        }
        if(tests[currentTest].state==1){
          // Rozwiazany
          newButton.classList.add("button", "btn-outline-warning");
          var br = document.createElement("br");
           var content = document.createTextNode("Your test is being evaluated");
           newButton.appendChild(br);
           newButton.appendChild(content);
        }
        if(tests[currentTest].state==2){
          // Oceniony
          newButton.classList.add("button", "btn-outline-danger");
          // Dopisz wynik do czerwonego przycisku <- generuje get na każdy rozwiazany test
          evalID = getUserName()+ "-"+ tests[currentTest].test.id
          getEvaluatedTest(evalID).then((score) => {
           let evaluatedTest = JSON.parse(score.body);
           let points = evaluatedTest.points;
           let totalPoints = evaluatedTest.test.questions.length;
           scoreText = `Your score is ${points} out of ${totalPoints}`;
          //  console.log(scoreText)
           var br = document.createElement("br");
           var content = document.createTextNode(scoreText);
           newButton.appendChild(br);
           newButton.appendChild(content);
          })
        }
        
        newButton.classList.add("button", "btn-lg");
        newButton.classList.add("button", "btn-block");
        newButton.addEventListener("click",
            function () {
                window.open("testModule/test.html?id=" + tests[currentTest].test.id, "_self");
            }
        );
        
        tableDiv.appendChild(newButton);
    }
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