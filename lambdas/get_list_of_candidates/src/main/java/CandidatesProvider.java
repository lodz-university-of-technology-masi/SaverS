import com.amazonaws.regions.Regions;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.cognitoidp.model.ListUsersRequest;
import com.amazonaws.services.cognitoidp.model.ListUsersResult;
import com.amazonaws.services.cognitoidp.model.UserType;

public class CandidatesProvider implements RequestHandler<String, List<String>>{

    public List<String> handleRequest(String recruiterName, Context context) {
        AWSCognitoIdentityProvider cognito = AWSCognitoIdentityProviderClientBuilder.standard()
                                                .withRegion(Regions.US_EAST_1)
                                                .build();

        /* Create request */
        ListUsersRequest request = new ListUsersRequest();
        request.setUserPoolId("us-east-1_HAV7sF97C");

        /* Make request */
        ListUsersResult result = cognito.listUsers(request);
        List<String> userEmails = result.getUsers().stream()
        /* select all candidates of passed recruiter */
        .filter(user -> {
            return user.getAttributes().stream()
                .filter(attr -> {
                    return attr.getName().equals("custom:recruiter")
                        && attr.getValue().equals(recruiterName);
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

}
