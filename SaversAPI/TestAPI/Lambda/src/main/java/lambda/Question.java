package lambda;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBIgnore;

import java.util.ArrayList;
import java.util.List;

@DynamoDBDocument
public class Question {
    private int id;
    private String type;
    private String content;
    private List<String> answers;
    @DynamoDBIgnore
    private ArrayList<String> errors;

    public Question() {
        this.errors = new ArrayList<>();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<String> getAnswers() {
        return answers;
    }

    public void setAnswers(List<String> answers) {
        this.answers = answers;
    }

    public ArrayList<String> getErrors() {
        return errors;
    }

    private void checkQuestionType(int id){
        switch (this.type) {
            case "O":
            case "L": {
                if (this.answers.isEmpty()) errors.add("Q"+id+"- Empty answer options");
                else if (!this.answers.get(0).equals("|")) errors.add("Q"+id+"A1- Missing |");
                break;
            }

            case "W": {
                if(this.answers.isEmpty()) errors.add("Empty answer options");
                else
                    for (int i = 0; i < this.answers.size(); i++) {
                        if(this.answers.get(i).equals("")) errors.add("Q"+id+"A"+(i+1)+"- answer option is empty");
                    }
                break;
            }

            default: errors.add("Q"+id+"- Invalid question type");
                break;
        }
    }

    public boolean checkQuestion(int id){
        if (this.id != id) errors.add("Q"+id+"- Mismatched number");
        if(this.content.equals("")) errors.add("Q"+id+"- Empty question content");
        checkQuestionType(id);
        return errors.size() == 0;
    }
}
