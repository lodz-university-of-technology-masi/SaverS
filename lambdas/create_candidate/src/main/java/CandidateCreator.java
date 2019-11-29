import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;

import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.cognitoidp.model.AdminCreateUserRequest;
import com.amazonaws.services.cognitoidp.model.AdminCreateUserResult;
import com.amazonaws.services.cognitoidp.model.AttributeType;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CandidateCreator implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent>{

    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent event, Context context) {

        /* Prepare response */
        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();

        try{

            /* Parse request body */
            Gson gson = new Gson();
            NewUserParams userParams = gson.fromJson(event.getBody(), NewUserParams.class);

            /* Validate user params */
            if(userParams.validate() == false){
                response.setStatusCode(400);
                response.setBody("\"" + NewUserParams.VALIDATION_ERROR_MESSAGE + "\"");
                return response;
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

            AdminCreateUserResult result = cognito.adminCreateUser(request);

            response.setStatusCode(200);
            response.setBody("\"" + result.getSdkResponseMetadata() + "\"");
            Map<String, String> headers = new HashMap<String, String>();
            headers.put("Access-Control-Allow-Origin", "*");
            response.setHeaders(headers);
            return response;

        }catch(JsonSyntaxException e){
            response.setStatusCode(400);
            response.setBody("\"Body parse error: " + e + "\"");
            return response;
        }

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
