package saversapi;

import java.util.ArrayList;
import java.util.List;

public class Question {
    private Integer number;
    private enum type {
        open, choice, numeric
    }
    private enum lang {
        PL,EN
    }
    private String question;

    private List<String> answers;

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public List<String> getAnswers() {
        return answers;
    }

    public void setAnswers(List<String> answers) {
        this.answers = answers;
    }
}
