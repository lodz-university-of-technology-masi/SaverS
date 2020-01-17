package lambda;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;

public class TranslateAPI {
    private static final String API_KEY = "trnsl.1.1.20191225T122643Z.487e5529f786621c.babf245b5c1ecb4444ee6cbddc532d54e49f44a1";
    private String sourceLang;
    private final String targetLang;

    public TranslateAPI(String targetLang) {
        this.targetLang = targetLang;
    }

    private String request(String URL) throws IOException {
        URL url = new URL(URL);
        URLConnection urlConn = url.openConnection();
        urlConn.addRequestProperty("User-Agent", "Mozilla");
        InputStream inStream = urlConn.getInputStream();
        String recieved = new BufferedReader(new InputStreamReader(inStream)).readLine();
        inStream.close();
        return recieved;
    }

    public String translate(String text) throws IOException {
        text = text.replace(" ", "%20");
        //System.out.println("https://translate.yandex.net/api/v1.5/tr.json/translate?key=" + API_KEY + "&text=" + text + "&lang=" + sourceLang + "-" + targetLang);
        String response = request("https://translate.yandex.net/api/v1.5/tr.json/translate?key=" + API_KEY + "&text=" + text + "&lang=" + sourceLang + "-" + targetLang);
        //System.out.println(response);
        return response.substring(response.indexOf("text")+8, response.length()-3);
    }

    public Test translateTest(Test test) {
       this.sourceLang = test.getLang();
       if (sourceLang == null || targetLang == null ) return null;
       test.setLang(this.targetLang);
       try {
           test.setName(translate(test.getName()));
            List<String> answers = new ArrayList<>();
            for (Question question : test.getQuestions() ) {
                question.setContent(translate(question.getContent()));
                if (question.getAnswers().size() > 1){
                    for (String answer : question.getAnswers()){
                        answers.add(translate(answer));
                    }
                    question.setAnswers(answers);
                }
            }
       }catch(Exception e) {
           return null;
       }
       return test;
    }
}