let text;
let lang = `en-en`;
let dane;
let selected = "";
APIkey = `dict.1.1.20191231T111832Z.3ffa08bfd4e19e3c.c56cc8b57c34f90e0b05d1d8d9c2f7367ca26bf0`;
langs = [];
function getSelectedText() { 

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
    lookup().then(showAlert,showError)
} 
function getLangs() {
    return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://dictionary.yandex.net/api/v1/dicservice.json/getLangs?key=${APIkey}`,
      type: "GET",
      headers: {
        "Authorization": getToken()
    },
      success: data => {
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
    // Dodaj do opcji wszystkie obslugiwane przez Yandex
    getLangs().then(() => {
        array = langs;
        for (var i = 0; i < array.length; i++) {
            var option = document.createElement("option");
            option.value = array[i];
            option.text = array[i];
            select.appendChild(option);
        }
    })
    // Dodaj do opcji tylko pl-ru, en-en
    // array = ["en-en","pl-ru"]
    // for (var i = 0; i < array.length; i++) {
    //           var option = document.createElement("option");
    //           option.value = array[i];
    //           option.text = array[i];
    //           select.appendChild(option);
    //       }
    
   

    
}

  function lookup() {
    var select = document.getElementById("language-option-selector");
    // console.log(select.value);
    selected = text.toString();
    return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${APIkey}&lang=${select.value}&text=${selected}`,
      type: "GET",
      headers: {
        "Authorization": getToken()
    },
      success: data => {
        if (data.def.length===0) {
          return reject()
        }
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
  function showAlert()
  {
      let preparedText=`Synonyms for "${selected}" are: `
      for(x of dane)
      {
          preparedText = preparedText + `\n`;
          preparedText = preparedText + `${x.text}`
      }
      alert(preparedText);
  }
  function showError()
  {
      let preparedText=`No synonyms for "${selected}" or you selected wrong language `
      alert(preparedText);
  }

createOption();
