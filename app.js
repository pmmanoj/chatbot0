// Jan 30th 2018

// Source: /Users/sanjivsingh/chatBot/BotBuilder-Samples/Node/intelligence-LUIS
// URL: https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-quickstart
//
  
require ('dotenv-extended').load();

var builder  = require('botbuilder');
var restify  = require('restify'); 

// ----- Quick Debug area ----- 
console.log(' App ID %s',   process.env.MicrosoftAppId )
console.log(' Password %s', process.env.MicrosoftAppPassword )
// ------ End Debug area ------


// Section 1: Setup BOT Server: REST endpoint, PORT listener, BOT process 
   
    // SETUP Restify Server (local machine) 
    var server = restify.createServer(); 
        server.listen( process.env.port || process.env.PORT || 9978, 
                       function() { console.log('%s listening to %s', server.name, server.url); }); 

    // CONNECTOR to communicate with Bot Framework Service (remote endpoint)
    var connector = new builder.ChatConnector( {
        // appId: process.env.MicrosoftAppId, 
        // appPassword: process.env.MicrosoftAppPassword } );                                                 
           appId: null, 
           appPassword: null } );                                                 

    // LISTENING at REST endpoint
    server.post( '/api/messages', connector.listen() );

    // RECEIVE user message and respond by echoing each message back to the user w/prefix
       var bot = new builder.UniversalBot( connector); 

  
// Section 2: Setup BOT dialog
         
    // DIALOG by default
       bot.dialog('/', function(session) { 
                       // yypsession.send("SkillAdvisor says ... : %s", session.message.text);
                       session.send(" DEV-BoT says ... : %s", session.message.text);
       } );

       
// --- end part 1: URL: https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-quickstart 


// SCRATCH Area 
       // RECEIVE user message and respond by echoing each message back to the user w/prefix
       /* 
       var bot = new builder.UniversalBot( connector,
                                           function(session) { 
                                           session.send("RAVANA SAYS ... : %s", session.message.text); 
       } );
       */

// ojhjBMP698|veoMZKD59$=;

