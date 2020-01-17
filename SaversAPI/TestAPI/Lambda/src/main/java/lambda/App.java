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
 * Class with lambda functions required by Savers recruitment system
 *
 * @author laureldil2
 * @version 2.0
 * @since 2019-12-28
 */
public class App {
    private DynamoDBMapper mapper;
    private Gson gson;

    public App() {
        AmazonDynamoDB client = AmazonDynamoDBAsyncClientBuilder.defaultClient();
        this.mapper = new DynamoDBMapper(client);
        this.gson = new Gson();
    }

    /**
     * Lambda function responsible for single test management
     *
     * @author laureldil2
     * @version 1.0
     * @since 2019-11-27
     */
    public Object singleTestHandler(final RequestTest requestTest, final Context context)  {
        if ((requestTest.getUserType() != 1) && (!requestTest.getHttpMethod().equals("GET"))){
            return new GatewayResponse("{\"message\":[\"Unauthorized access\"]}", this.getHeaders(), 401);
        }
        Test test = null;
        boolean isValidFlag = false;
        try{
            switch (requestTest.getHttpMethod()) {
                case "GET":
                    test = mapper.load(Test.class, requestTest.getTest().getId());
                    if (test != null)
                        return new GatewayResponse(gson.toJson(test), this.getHeaders(), 200);
                    else
                        return new GatewayResponse("{\"message\":[\"Test " + requestTest.getTest().getId() + " has not been found\"]}", this.getHeaders(), 404);

                case "POST":
                    test = requestTest.getTest();
                    try{
                        isValidFlag = test.isTestCorrect();
                    } catch (NullPointerException e){
                        return new GatewayResponse("{\"message\":[\"Invalid input json format\"]}", this.getHeaders(), 400);
                    }
                    if (isValidFlag) {
                        mapper.save(test);
                        return new GatewayResponse("{\"message\":[\"Test is correct\"]}", this.getHeaders(), 200);
                    } else return new GatewayResponse(gson.toJson(test), this.getHeaders(), 400);

                case "PUT":
                    test = requestTest.getTest();
                    try{
                        isValidFlag = test.isTestCorrect();
                    } catch (NullPointerException e){
                        return new GatewayResponse("{\"message\":[\"Invalid input json format\"]}", this.getHeaders(), 400);
                    }
                    if (mapper.load(Test.class, requestTest.getTest().getId()) == null)
                        return new GatewayResponse("{\"message\":[\"Test " + test.getId() + " has not been found\"]}", this.getHeaders(), 404);
                    if (isValidFlag) {
                        mapper.save(test);
                        return new GatewayResponse("{\"message\":[\"Test is correct\"]}", this.getHeaders(), 200);
                    } else return new GatewayResponse(gson.toJson(test), this.getHeaders(), 400);

                case  "DELETE":
                    test = mapper.load(Test.class, requestTest.getTest().getId());
                    if (test != null) {
                        Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
                        eav.put(":testID", new AttributeValue().withS(test.getId()));
                        eav.put(":stateTest", new AttributeValue().withN("0"));
                        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression().withFilterExpression("stateTest = :stateTest and testID = :testID").withExpressionAttributeValues(eav);
                        List<RequestUserTest> ruts = mapper.scan(RequestUserTest.class, scanExpression);
                        for ( RequestUserTest rut : ruts) {
                            mapper.delete(rut);
                        }
                        mapper.delete(test);
                        return new GatewayResponse("{\"message\":[\"Test " + requestTest.getTest().getId() +" has been removed\"]}", this.getHeaders(), 200);
                    }
                    else
                        return new GatewayResponse("{\"message\":[\"Test " + requestTest.getTest().getId() +" has not been found\"]}", this.getHeaders(), 404);
                default:
                    return new GatewayResponse("{\"message\":[\"Only GET, PUT, POST and DELETE methods are available\"]}", this.getHeaders(), 405);
            }
        } catch (Exception e) {
            return new GatewayResponse("{\"message\":[\"Failed to execute lambda function "+e.toString()+"\"]}", this.getHeaders(), 500);
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
        if (requestUser.getUserType() != 1){
            return new GatewayResponse("{\"message\":[\"Unauthorized access\"]}", this.getHeaders(), 401);
        }
        List<Test> tests = null;
        Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        try{
            eav.put(":username", new AttributeValue().withS(requestUser.getUsername()));
            DynamoDBScanExpression scanExpression = new DynamoDBScanExpression().withFilterExpression("recruiter = :username").withExpressionAttributeValues(eav);
            tests = mapper.scan(Test.class, scanExpression);
            if (tests != null && tests.size() != 0)
                return new GatewayResponse("{\"message\":[\"Found " + tests.size() + " tests\"], \"tests\":" + gson.toJson(tests) + "}", this.getHeaders(), 200);
            else
                return new GatewayResponse("{\"message\":[\"Recruiter " + requestUser.getUsername() + " does not have tests\"]}", this.getHeaders(), 404);
        } catch (Exception e) {
           return new GatewayResponse("{\"message\":[\"Failed to execute lambda function\"]}", this.getHeaders(), 500);
        }
    }

    private List<RequestUserTest> findAttribution (final String candidate, final String recruiter, final String testID) {
        Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":recruiter", new AttributeValue().withS(recruiter));
        eav.put(":testID", new AttributeValue().withS(testID));
        eav.put(":candidate", new AttributeValue().withS(candidate));
        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression().withFilterExpression("recruiter = :recruiter and testID = :testID and candidate = :candidate").withExpressionAttributeValues(eav);
        return mapper.scan(RequestUserTest.class, scanExpression);
    }

    /**
     * Lambda function responsible for saving test to user
     *
     * @author laureldil2
     * @version 1.0
     * @since 2019-12-15
     */
    public Object setTestToCandidate(final RequestUserTest requestUserTest, final Context context){
        if (requestUserTest.getUserType() != 1){
            return new GatewayResponse("{\"message\":[\"Unauthorized access\"]}", this.getHeaders(), 401);
        }
        List<RequestUserTest> attribution = null;
        boolean isValidFlag;
        try {
            try {
                isValidFlag = requestUserTest.isCorrect();
            } catch (NullPointerException e) {
                return new GatewayResponse("{\"message\":[\"Invalid input json format\"]}", this.getHeaders(), 400);
            }
            attribution = findAttribution(requestUserTest.getCandidate(), requestUserTest.getRecruiter(), requestUserTest.getTestID());
            if (attribution != null && attribution.size() != 0)
                return new GatewayResponse("{\"message\":[\"Attribution exists\"], \"attributions\":" + gson.toJson(attribution) + "}", this.getHeaders(), 403);
            if (isValidFlag) {
                requestUserTest.setState(0);
                mapper.save(requestUserTest);
                return new GatewayResponse("{\"message\":[\"Data is correct\"]}", this.getHeaders(), 200);
            } else return new GatewayResponse(gson.toJson(requestUserTest), this.getHeaders(), 400);
        } catch (Exception e) {
            System.out.println(e.toString());
            return new GatewayResponse("{\"message\":[\"Failed to execute lambda function\"]}", this.getHeaders(), 500);
        }
    }

    /**
     * Lambda function responsible for getting attribution by recruiter
     *
     * @author laureldil2
     * @version 1.0
     * @since 2019-12-15
     */
    public Object getTestToCandidateByRecruiter (final RequestUserTest requestUserTest, final Context context){
        if (requestUserTest.getUserType() != 1){
            return new GatewayResponse("{\"message\":[\"Unauthorized access\"]}", this.getHeaders(), 401);
        }
        List<RequestUserTest> attribution = null;
        Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        try {
            eav.put(":recruiter", new AttributeValue().withS(requestUserTest.getRecruiter()));
            DynamoDBScanExpression scanExpression = new DynamoDBScanExpression().withFilterExpression("recruiter = :recruiter").withExpressionAttributeValues(eav);
            attribution = mapper.scan(RequestUserTest.class, scanExpression);
            if (attribution != null && attribution.size() != 0)
                return new GatewayResponse("{\"message\":[\"Found " + attribution.size() + " attributions\"], \"attributions\":" + gson.toJson(attribution) + "}", this.getHeaders(), 200);
            else
                return new GatewayResponse("{\"message\":[\"Recruiter does not have attributions\"]}", this.getHeaders(), 404);
        } catch (Exception e) {
            return new GatewayResponse("{\"message\":[\"Failed to execute lambda function\"]}", this.getHeaders(), 500);
        }
    }

    /**
     * Lambda function responsible for getting attribution by candidate
     *
     * @author laureldil2
     * @version 1.0
     * @since 2019-12-15
     */
    public Object getTestToCandidateByCandidate (final RequestUserTest requestUserTest, final Context context){
        List<RequestUserTest> attribution = null;
        Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        try {
            eav.put(":candidate", new AttributeValue().withS(requestUserTest.getCandidate()));
            DynamoDBScanExpression scanExpression = new DynamoDBScanExpression().withFilterExpression("candidate = :candidate").withExpressionAttributeValues(eav);
            attribution = mapper.scan(RequestUserTest.class, scanExpression);
            if (attribution != null && attribution.size() != 0)
                return new GatewayResponse("{\"message\":[\"Found " + attribution.size() + " attributions\"], \"attributions\":" + gson.toJson(attribution) + "}", this.getHeaders(), 200);
            else
                return new GatewayResponse("{\"message\":[\"Candidate does not have attributions\"]}", this.getHeaders(), 404);
        } catch (Exception e) {
            return new GatewayResponse("{\"message\":[\"Failed to execute lambda function\"]}", this.getHeaders(), 500);
        }
    }

    /**
     * Lambda function responsible for solving test by candidate
     *
     * @author laureldil2
     * @version 1.0
     * @since 2019-12-15
     */
    public Object solveTest (final Answer answer, final Context context){
        List<RequestUserTest> attribution = null;
        try {
            attribution = attribution = findAttribution(answer.getCandidate(), answer.getRecruiter(), answer.getTest().getId());
            if (attribution == null || attribution.size() != 1)
                return new GatewayResponse("{\"message\":[\"User does not have permissions to solve this test\"]}", this.getHeaders(), 403);
            if (attribution.get(0).getState() != 0)
                return new GatewayResponse("{\"message\":[\"This test is solved or evaluated\"]}", this.getHeaders(), 403);
            if (!answer.isSolutionCorrect())
                return new GatewayResponse(gson.toJson(answer), this.getHeaders(), 400);
            attribution.get(0).setState(1);
            mapper.save(attribution.get(0));
            mapper.save(answer);
            return new GatewayResponse("{\"message\":[\"Data is correct\"]}", this.getHeaders(), 200);
        } catch (Exception e) {
            System.out.println(e.toString());
            return new GatewayResponse("{\"message\":[\"Failed to execute lambda function\"]}", this.getHeaders(), 500);
        }
    }

    /**
     * Lambda function responsible for evaluating test by recruiter
     *
     * @author laureldil2
     * @version 1.0
     * @since 2019-12-15
     */
    public Object evaluateTest (final Answer answer, final Context context){
        if (answer.getUserType() != 1){
            return new GatewayResponse("{\"message\":[\"Unauthorized access\"]}", this.getHeaders(), 401);
        }
        List<RequestUserTest> attribution = null;
        try {
            attribution = attribution = findAttribution(answer.getCandidate(), answer.getRecruiter(), answer.getTest().getId());
            if (attribution == null || attribution.size() != 1)
                return new GatewayResponse("{\"message\":[\"Recruiter does not have permissions to evaluate this test\"]}", this.getHeaders(), 403);
            if (attribution.get(0).getState() != 1)
                return new GatewayResponse("{\"message\":[\"This test is unsolved or evaluated\"]}", this.getHeaders(), 403);
            if (!answer.isEvaluationCorrect())
                return new GatewayResponse(gson.toJson(answer), this.getHeaders(), 400);
            attribution.get(0).setState(2);
            mapper.save(attribution.get(0));
            mapper.save(answer);
            return new GatewayResponse("{\"message\":[\"Data is correct\"]}", this.getHeaders(), 200);
        } catch (Exception e) {
            return new GatewayResponse("{\"message\":[\"Failed to execute lambda function "+e.toString()+"\"]}", this.getHeaders(), 500);
        }
    }

    /**
     * Lambda function responsible for getting test results
     *
     * @author laureldil2
     * @version 1.0
     * @since 2019-12-15
     */
    public Object getEvaluatedTestById(Answer answer, final Context context)  {
        Answer result;
        try {
            result = mapper.load(Answer.class, answer.getId());
            if (result != null)
                return new GatewayResponse(gson.toJson(result), this.getHeaders(), 200);
            else
                return new GatewayResponse("{\"message\":[\"Answer " + answer.getId() + " has not been found\"]}", this.getHeaders(), 404);
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

    /**
     * Lambda function responsible for test translation
     *
     * @author laureldil2
     * @version 1.0
     * @since 2019-12-28
     */
    public Object translate(RequestTest requestTest, final Context context)  {
        try {
            TranslateAPI tApi = new TranslateAPI(requestTest.getTargetLang());
            Test test = tApi.translateTest(requestTest.getTest());
            if (test == null) {
                return new GatewayResponse("{\"message\":[\"Invalid test format\"]}", this.getHeaders(), 400
                );
            }
            return new GatewayResponse(gson.toJson(test), this.getHeaders(), 200);
        } catch (Exception e) {
            return new GatewayResponse("{\"message\":[\"Failed to execute lambda function\"]}", this.getHeaders(), 500);
        }
    }

    /**
     * Lambda function responsible for exporting test
     *
     * @author laureldil2
     * @version 1.0
     * @since 2019-12-28
     */
    public Object export(RequestTest requestTest, final Context context)  {
        if (requestTest.getUserType() != 1){
            return new GatewayResponse("{\"message\":[\"Unauthorized access\"]}", this.getHeaders(), 401);
        }
        try {
            Test test = mapper.load(Test.class, requestTest.getTest().getId());
            if (test != null)
                return new GatewayResponse(test.exportToCSV(), this.getHeaders(), 200);
            else
                return new GatewayResponse("{\"message\":[\"Test " + requestTest.getTest().getId() + " can not be exported - invalid form\"]}", this.getHeaders(), 404);
        } catch (Exception e) {
            return new GatewayResponse("{\"message\":[\"Failed to execute lambda function\"]"+e.toString()+"}", this.getHeaders(), 500);
        }
    }

}
