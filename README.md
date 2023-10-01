### SQLWizard project

Our solution is designed to streamline the work of database handlers.

The core functionality of the project is the execution of queries to the AI model, which will generate a piece of SQL code for a given database at the user's request. The user has the option to chat with the model via a built-in web chat, edit the SQL code in the editor by themselves, and execute queries then view the results.

The application is available in Polish and English. Queries can be performed in both languages. An additional feature of the programme is the ability to change technical hyperparameters of the model such as temperature or upper probability in the advanced options.

The entire project uses Docker containerisation technology, which makes deploying and maintaining the entire environment very easy.

The main container contains a web server displaying the main user interface, which communicates with containers dealing with the translation of natural language into sql queries, which can later be verified and executed on the target database located on a separate container.

The solution we present does not include an AI model container due to limits from the hardware we have with us. Instead, the server is run outside the docker on the graphics card.
