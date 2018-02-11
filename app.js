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
        server.listen( process.env.port || process.env.PORT || 18978, 
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
    // var bot = new builder.UniversalBot( connector); 
    /* 
     *     We will need to move the BOT variable into the Dialog section
     *
     *     General form is: var bot = new builder.UniversalBot( connector, [ .. waterfall steps ..]); 
     */
  
// Section 2: Setup BOT dialog
         
    // STORAGE 
    var inMemoryStorage = new builder.MemoryBotStorage();  
      
    // DIALOG start
            //
            // TODO 1: anticipate a text string, create validation on user-etry
            // TODO 2: how to move the inline string responses to dialog cards? 

    var bot = new builder.UniversalBot( connector, 
        [  // array starts here 
          function(session) {  
            builder.Prompts.text( session, "WELCOME and Hello!! I am your A.I based skills coach. "  
                       + "...... first, we will try some simple stuff :-) " 
                       + " --->  " 
                       + " Tell me what you think is your TOPMOST skill or expertise (e.g. Security or UI/UX etc.) ? )" );

          }, 

          function( session, results ) { 
              // end and show response
              session.endDialog( `Hello ${ results.response } !!` ); 
              }
         ] );   // array ends here 

// END



/* 


            session.dialogData.endStatus = results.response

            // Process request and display reservation details
            session.send("The five persons **most** similar to your own top three skill sets are as follows: ");
            session.send( `Closest person 1: <br> John Smith   ... details at http://john.smith.com <br/>` + 
                          `        person 2: <br> Joseph Smith ... details at http://joseph.smith.com <br/>` + 
                          `        person 3: <br> Susan Mattis ... details at http://susan.mattis.com <br/>` + 
                          `        person 4: <br> Rachel Jones ... details at http://rachel.jones.com <br/>` + 
                          `        person 5: <br> Satish Jain  ... details at http://satish.jain.com <br/>` ); 

            session.endDialog();
          }

        ]
       ).set('storage', inMemoryStorage); // register in-memory storage


          //
          //
          // Dialog-waterfall step 1: 
          function(session, results) {
            // store the user-response from previous step
            session.dialogData.top1stSkill = ( [results.response] );

            // prompt for next step in waterfall-dialog 
            session.send(`So, your topmost skill is:<br>${session.dialogData.top1stSkill}<br/>`); 
            // attach the next prompt to this session
            builder.Prompts.text( session, "Now what is your second-highest skill or area of expertise ...? ");
          }, 

          // Dialog-waterfall step 2: 
          function(session, results) { 
            // store the user-response from previous step
            session.dialogData.top2ndSkill = results.response
                  
            // prompt for next step in waterfall-dialog 
            session.send(`So, your top two skills are:<br>${session.dialogData.top1stSkill}<br/>` + 
                         ` and <br>${session.dialogData.top2ndSkill}<br/>`); 
	    // attach the next prompt to this session
            builder.Prompts.text( session, "... one more step: let me know your third-highest skill or expertise ...? "); 
          }, 

          // Dialog-waterfall step 3: 
          function(session, results) { 
            // store the user-response from previous step
            session.dialogData.top3rdSkill = results.response
                  
            // prompt for next step in waterfall-dialog 
            session.send(`So, top three skills are:<br>${session.dialogData.top1stSkill}<br/>` + 
                                             ` and <br>${session.dialogData.top2ndSkill}<br/>` + 
                                             ` and <br>${session.dialogData.top3rdSkill}<br/>`); 
         
	    // attach the next prompt to this session
            builder.Prompts.text( session, "Type in OK ... to find 5 persons who are MOST similar to you!" );
          }, 

          function( session, results ) { 
            // store the value of user response in Step 3
            session.dialogData.endStatus = results.response

            // Process request and display reservation details
            session.send("The five persons **most** similar to your own top three skill sets are as follows: ");
            session.send( `Closest person 1: <br> John Smith   ... details at http://john.smith.com <br/>` + 
                          `        person 2: <br> Joseph Smith ... details at http://joseph.smith.com <br/>` + 
                          `        person 3: <br> Susan Mattis ... details at http://susan.mattis.com <br/>` + 
                          `        person 4: <br> Rachel Jones ... details at http://rachel.jones.com <br/>` + 
                          `        person 5: <br> Satish Jain  ... details at http://satish.jain.com <br/>` ); 

            session.endDialog();
          }

        ]
       ).set('storage', inMemoryStorage); // register in-memory storage
      

 */      

// --- end part 1: URL: https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-quickstart 

