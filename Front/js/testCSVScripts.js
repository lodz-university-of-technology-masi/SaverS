function createTest(){
    let name = document.getElementById('testNameInput').value;
    let file = document.getElementById('testFileInput').files[0];
    
    /* Validation */
    let valid = true;
    if(name.length === 0){
        $('#testNameInput').addClass('is-invalid');
        valid = false;
    }else{
        $('#testNameInput').removeClass('is-invalid');
    }
    if(file === undefined){
        $('#testFileInput').addClass('is-invalid');
        valid = false;
    }else{
        $('#testFileInput').removeClass('is-invalid');
    }
    if(!valid)
        return;

    /* Read file */
    let reader = new FileReader();
    reader.onload = (event) => {
        sendTest(name, event.target.result);
    };
    reader.onerror = (event) => {
        console.log(event.target.error);
        alert("Error while reading: " + event.target.error);
    };
    reader.readAsText(file);
}

function sendTest(name, text){
    /* Parse test */
    let test = parser.parse(text);

    if(typeof(test) == 'object'){
        /* If parser did not fail */
        test.recruiter = getUserName();
        test.name = name;
        test.lang = 'pl';
        console.log(text);
        console.log(test);
        
        /* Send */
        $.ajax({
            type: 'POST',
            url: 'https://dj9pgircgf.execute-api.us-east-1.amazonaws.com/SaversAPI/test',
            data: JSON.stringify(test),
            contentType: 'application/json',
            success: data => {
                console.log(data);
                $('#createTestModal').modal('hide');
            },
            error: err => {
                console.log(err);
                $('#alert-content').removeClass('d-none');
                $('#alert-content').text(err.responseText);
            }
        });
    }else{
        /* If parser failed */
        console.log(test);
        test = test.replace("<", "");
        test = test.replace(">", "");
        $('#alert-content').removeClass('d-none');
        $('#alert-content').text(test);
    }
}
