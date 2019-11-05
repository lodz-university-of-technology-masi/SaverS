let test = {
  id: "1",
  title: "Przykładowy Test",
  lang: "pl",
  questions: [
    {
      id: "1",
      type: "open",
      question: "What is your name and surname?",
      answers: ["|"]
    },
    {
      id: "2",
      type: "choice",
      question: "What does Cyclomatic Complexity measure?",
      answers: [
        "complexity of software",
        "duplication of code",
        "robustness",
        "number of lines of code"
      ]
    },
    {
      id: "3",
      type: "numeric",
      question: "How many principles were in the original Agile Manifesto?",
      answers: ["|"]
    }
  ]
};
const app = $("#test");
for (let i in test.questions) {
  app.append("<p>" + test.questions[i].question + "</p>");
  if (test.questions[i].answers == "|")
    app.append("<input id=" + i + ">" + "</input>");
  else
    // console.log(ans)
    for (let j in test.questions[i].answers)
      app.append("<input id=check"  + j + " type=checkBox>" + test.questions[i].answers[j] + "</input>");
}
const ans = $('#answers')
let zapiszTest = () => {
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

