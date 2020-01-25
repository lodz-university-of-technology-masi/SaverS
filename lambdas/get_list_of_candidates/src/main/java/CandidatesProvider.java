import com.amazonaws.regions.Regions;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.cognitoidp.model.ListUsersRequest;
import com.amazonaws.services.cognitoidp.model.ListUsersResult;
import com.amazonaws.services.cognitoidp.model.UserType;

public class CandidatesProvider implements RequestHandler<GetListOfCandidatesRequest, List<String>>{

    public List<String> handleRequest(GetListOfCandidatesRequest getListOfCandidatesRequest, Context context) {

        /* Authorization */
        if(!getListOfCandidatesRequest.getUsertype().equals("1")){
            throw new RuntimeException("Operation not permitted!");
        }

        AWSCognitoIdentityProvider cognito = AWSCognitoIdentityProviderClientBuilder.standard()
                                                .withRegion(Regions.US_EAST_1)
                                                .build();

        /* Create request */
        ListUsersRequest request = new ListUsersRequest();
        request.setUserPoolId("us-east-1_HAV7sF97C");

        /* Make requests to get all users */
        List<UserType> users = new ArrayList<UserType>();
        ListUsersResult result;
        do{
            result = cognito.listUsers(request);
            users.addAll(result.getUsers());
            request.setPaginationToken(result.getPaginationToken());
        }while(result.getPaginationToken() != null);

        List<String> userEmails = users.stream()
        /* select all candidates of passed recruiter */
        .filter(user -> {
            return user.getAttributes().stream()
                .filter(attr -> {
                    return attr.getName().equals("custom:recruiter")
                        && attr.getValue().equals(getListOfCandidatesRequest.getUsername());
                })
                .findAny()
                .isPresent();
        })
        /* map into their emails */
        .map(user -> {
            return user.getAttributes().stream()
                    .filter(attr -> attr.getName().equals("email"))
                    .findAny()
                    .get()
                    .getValue();
        })
        .collect(Collectors.toList());
        return userEmails;
    }

    public static void main(String[] args){
        /* Local test */
        CandidatesProvider provider = new CandidatesProvider();
        GetListOfCandidatesRequest request = new GetListOfCandidatesRequest("karwojan@gmail.com", "1");
        provider.handleRequest(request, null);
    }
}

class GetListOfCandidatesRequest{

    private String username;
    private String usertype;

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

    public GetListOfCandidatesRequest() {}

    public GetListOfCandidatesRequest(String username, String usertype) {
        this.username = username;
        this.usertype = usertype;
    }

}
