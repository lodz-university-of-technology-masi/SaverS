echo "Generating parser..."
java -jar antlr-4.7.1-complete.jar -o test_parser_src csv.g4
echo " DONE"
echo "Compiling..."
cd test_parser_src
javac -cp ../antlr-4.7.1-complete.jar *.java
cd ..
echo " DONE"
echo "Running..."
java -cp ./test_parser_src:antlr-4.7.1-complete.jar org.antlr.v4.gui.TestRig csv test example.csv -gui -tokens
echo " DONE"
rm -rf test_parser_src
