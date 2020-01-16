import com.amazonaws.regions.Regions;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import java.util.List;

import com.amazonaws.services.cognitoidp.*;
import com.amazonaws.services.cognitoidp.model.*;

public class CandidateRemover implements RequestHandler<RemovedCandidateParams, String>{

    private static final String USER_POOL_ID = "us-east-1_HAV7sF97C";

    public String handleRequest(RemovedCandidateParams params, Context context) {

        AWSCognitoIdentityProvider cognito = AWSCognitoIdentityProviderClientBuilder.standard()
                                                    .withRegion(Regions.US_EAST_1)
                                                    .build();

        /* Check if candidate is realy candidate of this recruiter */
        AdminGetUserRequest getUserRequest = new AdminGetUserRequest();
        getUserRequest.setUsername(params.getCandidate());
        getUserRequest.setUserPoolId(USER_POOL_ID);
        AdminGetUserResult getUserResult = cognito.adminGetUser(getUserRequest);
        if(!getUserResult.getUserAttributes().stream()
            .filter((AttributeType attribute) -> 
                    attribute.getName().equals("custom:recruiter") && attribute.getValue().equals(params.getRecruiter()))
            .findAny()
            .isPresent()){
            throw new RuntimeException("This is not your candidate");
        }

        /* Remove candidate */
        AdminDeleteUserRequest request = new AdminDeleteUserRequest();
        request.setUsername(params.getCandidate());
        request.setUserPoolId(USER_POOL_ID);
        cognito.adminDeleteUser(request);

        return "OK";
    }
}

class RemovedCandidateParams{

    private String candidate;
    private String recruiter;

    public void setRecruiter(String recruiter) {
        this.recruiter = recruiter;
    }

    public String getRecruiter() {
        return recruiter;
    }

    public void setCandidate(String candidate) {
        this.candidate = candidate;
    }

    public String getCandidate() {
        return candidate;
    }

    public RemovedCandidateParams(String candidate, String recruiter) {
        this.candidate = candidate;
        this.recruiter = recruiter;
    }

    public RemovedCandidateParams(){}
}
