let test;
function getJsonData() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://x3vqos9dhc.execute-api.us-east-1.amazonaws.com/testJJ/getusertests?userID=${userPool.clientId}`,
      type: "GET",
      headers: {
        Authorization: getToken(),
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      success: data => {
        console.log(data);
        test = data.Item;
        return resolve();
        // updateTodoList();
      },
      error: err => {
        console.log(err.responseJSON);
        return reject(err.responseText);
      }
    });
  });
}
let scoreJSON;
function getScore(userID,testID) {
  return new Promise((resolve, reject) => {
  $.ajax({
    url: `https://x3vqos9dhc.execute-api.us-east-1.amazonaws.com/testJJ/getTestForCheck?userID=${userID}&testID=${testID}`,
    type: "GET",
    success: data => {
      console.log(`url`,`http://127.0.0.1:5500/Front/testModule/evaluateTest.html?userID=${userID}&testID=${testID}`)
      console.log(data);
      scoreJSON = data.Items[0];
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
$(document).ready(function() {
  getJsonData().then(() => {
    console.log(test);
    const app = document.getElementById("main");
    for (let j in test.tests) {
      let i = test.tests[j]
      console.log(i.testID);
      let id = i.testID;
      //   <a href=""><button type="button" class="btn btn-outline-success btn-lg btn-block">Test1</button></a>
      let button = document.createElement("button");
      if(i.resolved=="false")
      {
      button.classList.add("btn", "btn-outline-success", "btn-lg", "btn-block");
      button.setAttribute("onclick", `openTest("${id}")`);
      button.appendChild(document.createTextNode("Test do rozwiązania"));
    }
    if(i.resolved=="locked")
    {
    button.classList.add("btn", "btn-outline-warning", "btn-lg", "btn-block");
    button.appendChild(document.createTextNode("Test w trakcie sprawdzania"));

    }
   if(i.resolved=="true")
    {
    button.classList.add("btn", "btn-outline-danger", "btn-lg", "btn-block");
    button.appendChild(document.createTextNode("Test rozwiązany"));
    let br = document.createElement('br')
    button.appendChild(br);
    let testUUID = userPool.clientId+"/"+i.testID;
    console.log(testUUID);
    getScore(userPool.clientId,i.testID).then(() => {
      button.appendChild(document.createTextNode(`Wynik ${scoreJSON.score}`));
    });
    }
      app.prepend(button);
    }
  });
});
function openTest(id) {
  window.open(`testModule/test.html?id=${id}`, "_self");
}



