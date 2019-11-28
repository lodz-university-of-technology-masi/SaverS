if test $# -ne 2; then
    echo "Usage: prepare_lambda_template <lambda_name> <main_class_name>"
    exit 0
fi

POM_TEXT="<project xmlns=\"http://maven.apache.org/POM/4.0.0\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"
    xsi:schemaLocation=\"http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd\">
    <modelVersion>4.0.0</modelVersion>

    <groupId>SaverS</groupId>
    <artifactId>${1}</artifactId>
    <packaging>jar</packaging>
    <version>1.0-SNAPSHOT</version>

    <dependencies>
        <dependency>
            <groupId>com.amazonaws</groupId>
            <artifactId>aws-lambda-java-core</artifactId>
            <version>1.2.0</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-shade-plugin</artifactId>
                <version>3.2.1</version>
                <configuration>
                    <createDependencyReducedPom>false</createDependencyReducedPom>
                </configuration>
                <executions>
                    <execution>
                        <phase>package</phase>
                        <goals>
                            <goal>shade</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
</project>"

HELLO_TEXT="import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

public class ${2} implements RequestHandler<Integer, String>{
    public String handleRequest(Integer myCount, Context context) {
        return String.valueOf(myCount);
    }
}"

CREATE_LAMBDA_TEXT="aws lambda create-function --function-name ${1} --runtime java8 --role arn:aws:iam::439015664918:role/basic_lambda_role --handler ${2}::handleRequest --zip-file fileb://target/${1}-1.0-SNAPSHOT.jar --memory-size 512 --timeout 15"

UPDATE_LAMBDA_TEXT="aws lambda update-function-code --function-name ${1} --zip-file fileb://target/${1}-1.0-SNAPSHOT.jar"


mkdir $1
echo -e "$POM_TEXT" > $1/pom.xml
mkdir $1/src
mkdir $1/src/main
mkdir $1/src/main/java
echo -e "$HELLO_TEXT" > $1/src/main/java/${2}.java
mkdir $1/scripts
echo -e "$CREATE_LAMBDA_TEXT" > $1/scripts/create_function.sh
chmod +x $1/scripts/create_function.sh
echo -e "$UPDATE_LAMBDA_TEXT" > $1/scripts/update_function.sh
chmod +x $1/scripts/update_function.sh
