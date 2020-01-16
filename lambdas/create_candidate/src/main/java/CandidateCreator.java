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

public class CandidateCreator implements RequestHandler<CreateCandidateRequest, String>{

    public String handleRequest(CreateCandidateRequest createCandidateRequest, Context context) {

        /* Authorization */
        if(!createCandidateRequest.getUsertype().equals("1")){
            throw new RuntimeException("Operation not permitted!");
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
        recruiter.setValue(createCandidateRequest.getUsername());
        List<AttributeType> attributes = new ArrayList<AttributeType>();
        attributes.add(usertype);
        attributes.add(recruiter);

        /* Create request */
        AdminCreateUserRequest request = new AdminCreateUserRequest();
        request.setUsername(createCandidateRequest.getCandidate());
        request.setUserPoolId("us-east-1_HAV7sF97C");
        request.setUserAttributes(attributes);

        /* Make request */
        AdminCreateUserResult result = cognito.adminCreateUser(request);

        /* Return response */
        return "OK";
    }
}

class CreateCandidateRequest{

    private String username;
    private String usertype;
    private String candidate;

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsertype(String usertype) {
        this.usertype = usertype;
    }

    public String getUsertype() {
        return usertype;
    }

    public void setCandidate(String candidate) {
        this.candidate = candidate;
    }

    public String getCandidate() {
        return candidate;
    }
}
