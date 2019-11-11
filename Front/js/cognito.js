 function createUser() {
    var username;
	var password;
	var email;
	var poolData;
    var userType;
    var isDataValid = true;

    $('#alert-content').text('')
    $('#alert-content').addClass('d-none')
    $('#success-content').text('')
    $('#success-content').addClass('d-none')
	
    if ($("#inputUsername").val() === "") {
        $('#alert-content').append('Invalid username!<br>')
        $('#alert-content').removeClass('d-none')
        isDataValid = false;
    } else {
        username =  $("#inputUsername").val();
    }
     
    var emailRegex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (!emailRegex.test($('#inputEmailAddress').val())) {
        $('#alert-content').append('Invalid email!<br>')
        $('#alert-content').removeClass('d-none')
        isDataValid = false;
    } else {
        email = $("#inputEmailAddress").val();    
    }
    
    if ($("#inputPassword").val() === "") {
        $('#alert-content').append('Invalid password!<br>')
        $('#alert-content').removeClass('d-none')
		isDataValid = false;
    } else { 
        if ($("#inputPassword").val() != $("#inputConfirmPassword").val()) {
            $('#alert-content').append('Passwords do not match!')
            $('#alert-content').removeClass('d-none')
            isDataValid = false;
        } else {
            password =  $("#inputPassword").val();	
        }
    }
     
    userType = $("#userRole").val();

    if (!isDataValid) return;
     
	poolData = {
			UserPoolId : _config.cognito.userPoolID,
			ClientId : _config.cognito.clientID
		};	
    
	var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
     
	var attributeList = [];
	
	var dataEmail = {
		Name : 'email', 
		Value : email, //get from form field
    }
	
	var dataUserType = {
		Name : 'custom:userType', 
		Value : userType, //get from form field
    };
     
	var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
	var attributeUserType = new AmazonCognitoIdentity.CognitoUserAttribute(dataUserType);
	
	attributeList.push(attributeEmail);
	attributeList.push(attributeUserType);

	userPool.signUp(username, password, attributeList, null, function(err, result){
		if (err) {
            $('#alert-content').append(err.message)
            $('#alert-content').removeClass('d-none')
			return;
		}
		cognitoUser = result.user;
		console.log('user name is ' + cognitoUser.getUsername());
        $('#success-content').append("Check your email for a verification link")
        $('#success-content').removeClass('d-none')
	});
  }


function signIn() {
    $('#alert-content').text('')
    $('#alert-content').addClass('d-none')
    
	var authenticationData = {
        Username : $("#inputUsername").val(),
        Password : $("#inputPassword").val(),
    };
	
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    
	var poolData = {
        UserPoolId : _config.cognito.userPoolID, // Your user pool id here
        ClientId : _config.cognito.clientID, // Your client id here
    };
	
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
	
    var userData = {
        Username : $("#inputUsername").val(),
        Pool : userPool,
    };
	
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
	cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            var cognitoUser = userPool.getCurrentUser();
            if (cognitoUser != null) {
                cognitoUser.getSession(function(err, session) {
                    if (err) {
                        $('#alert-content').append(err.message)
                        $('#alert-content').removeClass('d-none')
                        return;
                    }
                    cognitoUser.getUserAttributes(function(err, result) {
                        if (err) {
                            $('#alert-content').append(err.message)
                            $('#alert-content').removeClass('d-none')
                            return;
                        }
                        if (result[0].getValue() === "1") {
                            window.open("recruiterMain.html","_self")
                        } else {
                            window.open("candidateMain.html","_self")    
                        }
                    });
                    
                });
            }
        },
        onFailure: function(err) {
            $('#alert-content').append(err.message)
            $('#alert-content').removeClass('d-none')
        },
    });
  }

function getUser() {
    var poolData = {
        UserPoolId : _config.cognito.userPoolID, // Your user pool id here
        ClientId : _config.cognito.clientID, // Your client id here
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    return userPool.getCurrentUser();
}

function getUserType() { 
    return new Promise((resolve, reject) => {
    var userType
    cognitoUser = getUser()
    if (cognitoUser != null) {
        cognitoUser.getSession((err, session) => {
            if (err) {
                return reject(err.message)
            }
            cognitoUser.getUserAttributes((err, result) => {
                if (err) {
                    return reject(err.message)
                }
                return resolve(result[0].getValue())
            });
        });
    } else return reject("Null user")
});
                    }

function isRecruiter() {
    getUserType().then(
        result => {
            if (result != "1") logOut()
        },
        reject => logOut()
    )
}

function getUserName() {
    return getUser().getUsername()
}

function isCandidate() {
    getUserType().then(
        result => {
            if (result != "0") logOut()
        },
        reject => logOut()
    )
}

function isUserType(userType) {
    getUserType().then(
        result => {
            if (result != userType) logOut()
        },
        reject => logOut()
    )
}

function logOut() {
    cognitoUser = getUser();
    if (cognitoUser != null) {
          cognitoUser.signOut();
        }
    cognitoUser = null
    window.open("index.html","_self")
}


$('.recruiterNick').text("Recruiter: " + getUserName())
$('.candidateNick').text("Candidate: " + getUserName())