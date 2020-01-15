function checkIfCookieEmpty(){
    if(document.cookie.toString() === ""){
        alert("Nie jestes upowazniony do tego zasobu");
        window.open(`${window.location.origin}/index.html`,"_self")
    }
}
function checkForCandidate() {

    checkIfCookieEmpty();
    if(JSON.parse(document.cookie).usertype != 1){
        alert("Nie jestes upowazniony do tego zasobu");
        window.open(`${window.location.origin}/index.html`,"_self")
    }
}
function checkForRecruiter(){
    checkIfCookieEmpty();
    if(JSON.parse(document.cookie).usertype != 1){
        alert("Nie jestes upowazniony do tego zasobu");
        window.open(`${window.location.origin}/index.html`,"_self")
    }
}