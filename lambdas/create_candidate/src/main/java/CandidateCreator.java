import com.amazonaws.regions.Regions;

import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.cognitoidp.model.AdminCreateUserRequest;
import com.amazonaws.services.cognitoidp.model.AdminCreateUserResult;
import com.amazonaws.services.cognitoidp.model.AttributeType;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import java.util.ArrayList;
import java.util.List;

public class CandidateCreator implements RequestHandler<NewUserParams, String>{

    public String handleRequest(NewUserParams userParams, Context context) {

            /* Validate user params */
            if(userParams.validate() == false){
                return NewUserParams.VALIDATION_ERROR_MESSAGE;
            }

            /* Main action - create new user */
            AWSCognitoIdentityProvider cognito = AWSCognitoIdentityProviderClientBuilder
                .standard()
                .withRegion(Regions.US_EAST_1)
                .build();

            /* Create attributes - usertype, recruiter */
            AttributeType usertype = new AttributeType();
            usertype.setName("custom:usertype");
            usertype.setValue("2");
            AttributeType recruiter = new AttributeType();
            recruiter.setName("custom:recruiter");
            recruiter.setValue("unknown"); //TODO
            List<AttributeType> attributes = new ArrayList<AttributeType>();
            attributes.add(usertype);
            attributes.add(recruiter);

            /* Create request */
            AdminCreateUserRequest request = new AdminCreateUserRequest();
            request.setUsername(userParams.getUsername());
            request.setUserPoolId("us-east-1_HAV7sF97C");
            request.setUserAttributes(attributes);

            /* Make request */
            AdminCreateUserResult result = cognito.adminCreateUser(request);

            /* Return response */
            return "OK";
    }
}

class NewUserParams{

    public static final String VALIDATION_ERROR_MESSAGE = 
        "Invalid user data! Required attributes: 'username' - proper email address";

    private String username;

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    boolean validate(){
        return username != null;
    }
}
