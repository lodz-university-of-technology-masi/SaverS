let text;
function getSelectedText() { 
    // var selectedText = ''; 

    // window.getSelection 
    if (window.getSelection) { 
        text = window.getSelection(); 
    } 
    // document.getSelection 
    else if (document.getSelection) { 
        text = document.getSelection(); 
    } 
    // document.selection 
    else if (document.selection) { 
        text = document.selection.createRange().text; 
    } else return; 
    // To write the selected text into the textarea 
    document.testform.selectedtext.value = text; 
    lookup().then( () => {
        showAlert();
    });
    
} 

APIkey = `dict.1.1.20191231T111832Z.3ffa08bfd4e19e3c.c56cc8b57c34f90e0b05d1d8d9c2f7367ca26bf0`;
langs = [];
function getLangs() {
    return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://dictionary.yandex.net/api/v1/dicservice.json/getLangs?key=${APIkey}`,
      type: "GET",
      success: data => {
        console.log(data);
        langs = data; 
        return resolve()
      },
      error: err => {
        console.log(err.responseJSON);
        return reject(err.responseText)
      }
    })
  })
  };
function createOption()
{
    var select = document.getElementById("language-option-selector");
    getLangs().then(() => {
        array = langs;
        for (var i = 0; i < array.length; i++) {
            var option = document.createElement("option");
            option.value = array[i];
            option.text = array[i];
            select.appendChild(option);
        }
    })
    
}
  lang = `en-en`;
  let dane;
  let selected = "";
  function lookup() {
    var select = document.getElementById("language-option-selector");
    console.log(select.value);
    selected = text.toString();
    return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${APIkey}&lang=${select.value}&text=${selected}`,
      type: "GET",
      success: data => {
        console.log(`ang=${lang}&text=${selected}`,);
        console.log(data.def[0].tr);  
        dane = data.def[0].tr;
        return resolve()
      },
      error: err => {
        console.log(err.responseJSON);
        return reject(err.responseText)
      }
    })
  })
  };
  let synonimy = [];
  function splitData(){

      for(x of dane)
      {
          synonimy.push(x.text);
      }
  }
  function showAlert()
  {
      let preparedText=`Synonyms for "${selected}" are: `
      console.log(preparedText);
      for(x of dane)
      {
          preparedText = preparedText + `\n`;
          preparedText = preparedText + `${x.text}`
      }
      alert(preparedText);
  }

createOption();
