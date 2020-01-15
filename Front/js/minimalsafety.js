function checkIfCookieEmpty(){
    if(document.cookie.toString() === ""){
        alert("Nie jestes upowazniony do tego zasobu");
        window.open("index.html","_self")
    }
}
function checkForCandidate() {

    checkIfCookieEmpty();
    if(getUserType() != 1){
        alert("Nie jestes upowazniony do tego zasobu");
        window.open("index.html","_self")
    }
}
function checkForRecruiter(){
    checkIfCookieEmpty();
    if(getUserType() != 1){
        alert("Nie jestes upowazniony do tego zasobu");
        window.open("index.html","_self")
    }
}