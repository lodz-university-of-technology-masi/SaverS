/* Define my application's user pool */
const userPool = new AmazonCognitoIdentity.CognitoUserPool({
    UserPoolId: _config.cognito.userPoolID,
    ClientId: _config.cognito.clientID
});

function createCandidateAccount(){
    $('#alert-content').text('')
    $('#alert-content').addClass('d-none')
    $('#success-content').text('')
    $('#success-content').addClass('d-none')
    let email = prompt("Podaj email kandydata:");
    let data = {
        username: email,
        recruiter: getUserName()
    };
    $.ajax({
        method: 'POST',
        url: 'https://6fsmq4shbf.execute-api.us-east-1.amazonaws.com/beta/candidates',
        data: JSON.stringify(data),
        headers: {
            Authorization: JSON.parse(document.cookie).token
        },
        success: (data) => {
            if(data.errorMessage){
                $('#alert-content').append(data.errorMessage);
                $('#alert-content').removeClass('d-none')
            }else{
                $('#success-content').append("Invitation has been sent to candidate!");
                $('#success-content').removeClass('d-none')
            }
        },
        error: (err) => {
            $('#alert-content').append(err.statusText);
            $('#alert-content').removeClass('d-none')
        }
    });
}

function signUp(){
    let email = $("#inputEmailAddress").val();    
    let password =  $("#inputPassword").val();	

    /* Data validation */
    var isDataValid = true;

    $('#alert-content').text('')
    $('#alert-content').addClass('d-none')
    $('#success-content').text('')
    $('#success-content').addClass('d-none')
	
    var emailRegex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!emailRegex.test($('#inputEmailAddress').val())){
        $('#alert-content').append('Invalid email!<br>');
        isDataValid = false;
    }
    
    if($("#inputPassword").val() === ""){
        $('#alert-content').append('Invalid password!<br>');
	isDataValid = false;
    }else{
        if($("#inputPassword").val() != $("#inputConfirmPassword").val()){
            $('#alert-content').append('Passwords do not match!');
            isDataValid = false;
        }
    }
     
    if(!isDataValid){
        $('#alert-content').removeClass('d-none')
        return;
    }
     
    /* Prepare attributes */
    var attributeList = [];
    var dataUserType = {
        Name : 'custom:usertype', 
        Value : '1'
    };
    var attributeUserType = new AmazonCognitoIdentity.CognitoUserAttribute(dataUserType);
    attributeList.push(attributeUserType);

    /* Sign up */
    userPool.signUp(email, password, attributeList, null, function(err, result){
        if(err){
            $('#alert-content').append(err.message)
            $('#alert-content').removeClass('d-none')
            return;
        }
        $('#success-content').append("Check your email for a verification link")
        $('#success-content').removeClass('d-none')
    });
}

function signIn() {
    $('#alert-content').text('')
    $('#alert-content').addClass('d-none')

    /* Helper function invoked when properly signed in */
    function logIn(result){
        /* Save userdata in cookie */
        let username = result.getIdToken().payload['email'];
        let usertype = result.getIdToken().payload['custom:usertype'];
        let userdata = {
            token: result.getIdToken().getJwtToken(),
            username: username,
            usertype: usertype
        };
        document.cookie = JSON.stringify(userdata);

        /* Redirect to proper subpage */
        if(usertype == '1'){
            window.open("recruiterMain.html","_self")
        }else{
            window.open("candidateMain.html", "_self");
        }
    }

    let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: $("#inputUsername").val(),
        Password: $("#inputPassword").val()
    });

    let cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: $("#inputUsername").val(),
        Pool: userPool
    });
    
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: logIn,
        onFailure: function(err) {
            /* Print authentication error message */
            $('#alert-content').append(err.message)
            $('#alert-content').removeClass('d-none')
        },
        newPasswordRequired: function(userAttributes, requiredAttributes){
            let newPassword = prompt("Podaj nowe hasło:");
            cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, {
                onSuccess: logIn,
                onFailure: function(err){
                    /* Print authentication error message */
                    $('#alert-content').append(err.message)
                    $('#alert-content').removeClass('d-none')
                }
            });
        }
    });
}

function getUserType(){
    let userdata = JSON.parse(document.cookie);
    if(userdata.usertype != undefined){
        return userdata.usertype;
    }else{
        return "unknown";
    }
}

function getUserName(){
    let userdata = JSON.parse(document.cookie);
    if(userdata.username != undefined){
        return userdata.username;
    }else{
        return "unknown";
    }
}

function logOut(){
    if(getUserName() != "unknown"){
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser({
            Username: getUserName(),
            Pool: userPool
        });
        cognitoUser.signOut();
        document.cookie = "";
        window.open("index.html","_self")
    }
}

$('.recruiterNick').text("Recruiter: " + getUserName())
$('.candidateNick').text("Candidate: " + getUserName())
