package lambda;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBAsyncClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.lambda.runtime.Context;
import com.google.gson.Gson;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Lambda function responsible for validating, saving, deleting and searching and updating tests by id
 *
 * @author laureldil2
 * @version 1.0
 * @since 2019-11-07
 */
public class App {
    public Object singleTestHandler(final RequestTest requestTest, final Context context)  {
        AmazonDynamoDB client = AmazonDynamoDBAsyncClientBuilder.defaultClient();
        DynamoDBMapper mapper = new DynamoDBMapper(client);
        Gson gson = new Gson();
        Test test = null;
        boolean isValidFlag = false;
        try{
            switch (requestTest.getHttpMethod()) {
                case "GET":
                    test = mapper.load(Test.class, requestTest.getTest().getId());
                    if (test != null)
                        return new GatewayResponse(gson.toJson(test), this.getHeaders(), 200);
                    else
                        return new GatewayResponse("{\"message\":[\"Test " + requestTest.getTest().getId() + " has not been found\"]}", this.getHeaders(), 9000);

                case "POST":
                    test = requestTest.getTest();
                    try{
                        isValidFlag = test.isTestCorrect();
                    } catch (NullPointerException e){
                        return new GatewayResponse("{\"message\":[\"Invalid input json format\"]}", this.getHeaders(), 501);
                    }
                    if (isValidFlag) {
                        mapper.save(test);
                        return new GatewayResponse("{\"message\":[\"Test is correct\"]}", this.getHeaders(), 200);
                    } else return new GatewayResponse(gson.toJson(test), this.getHeaders(), 9000);

                case "PUT":
                    test = requestTest.getTest();
                    try{
                        isValidFlag = test.isTestCorrect();
                    } catch (NullPointerException e){
                        return new GatewayResponse("{\"message\":[\"Invalid input json format\"]}", this.getHeaders(), 501);
                    }
                    if (mapper.load(Test.class, requestTest.getTest().getId()) == null)
                        return new GatewayResponse("{\"message\":[\"Test " + test.getId() + " has not been found\"]}", this.getHeaders(), 9000);
                    if (isValidFlag) {
                        mapper.save(test);
                        return new GatewayResponse("{\"message\":[\"Test is correct\"]}", this.getHeaders(), 200);
                    } else return new GatewayResponse(gson.toJson(test), this.getHeaders(), 9000);

                case  "DELETE":
                    test = mapper.load(Test.class, requestTest.getTest().getId());
                    if (test != null) {
                        mapper.delete(test);
                        return new GatewayResponse("{\"message\":[\"Test " + requestTest.getTest().getId() +" has been removed\"]}", this.getHeaders(), 200);
                    }
                    else
                        return new GatewayResponse("{\"message\":[\"Test " + requestTest.getTest().getId() +" has not been found\"]}", this.getHeaders(), 9000);
                default:
                    return new GatewayResponse("{\"message\":[\"Only GET, PUT, POST and DELETE methods are available\"]}", this.getHeaders(), 501);
            }
        } catch (Exception e) {
            return new GatewayResponse("{\"message\":[\"Failed to execute lambda function\"]}", this.getHeaders(), 500);
        }
    }

    /**
     * Lambda function responsible for getting all tests by recruiter
     *
     * @author laureldil2
     * @version 1.0
     * @since 2019-11-27
     */
    public Object getTestsByRecruiter(final RequestUser requestUser, final Context context)  {
        AmazonDynamoDB client = AmazonDynamoDBAsyncClientBuilder.defaultClient();
        DynamoDBMapper mapper = new DynamoDBMapper(client);
        Gson gson = new Gson();
        List<Test> tests = null;
        try{
            Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
            eav.put(":username", new AttributeValue().withS(requestUser.getUsername()));
            DynamoDBScanExpression scanExpression = new DynamoDBScanExpression().withFilterExpression("recruiter = :username").withExpressionAttributeValues(eav);
            tests = mapper.scan(Test.class, scanExpression);
            if (tests != null && tests.size() != 0)
                return new GatewayResponse("{\"message\":[\"Found " + tests.size() + " tests\"], \"tests\":" + gson.toJson(tests) + "}", this.getHeaders(), 200);
            else
                return new GatewayResponse("{\"message\":[\"Recruiter does not have tests\"]}", this.getHeaders(), 9000);
        } catch (Exception e) {
           return new GatewayResponse("{\"message\":[\"Failed to execute lambda function\"]}", this.getHeaders(), 500);
        }
    }

    private Map<String, String> getHeaders(){
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");
        headers.put("Access-Control-Allow-Origin", "*");
        return headers;
    }
}
