aws lambda create-function --function-name remove_candidate --runtime java8 --role arn:aws:iam::244452199480:role/basic_lambda --handler CandidateRemover::handleRequest --zip-file fileb://target/remove_candidate-1.0-SNAPSHOT.jar --memory-size 512 --timeout 15