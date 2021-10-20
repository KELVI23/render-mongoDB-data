const express = require('express');
const database = require('./database');

const app = express();

app.set('port', process.env.PORT || 3000);

//load views from
app.set('views', './app/views');
//view engine to use
app.set('view engine', 'pug');

// Export static folder (visible to the frontend, under the "/public" path)
app.use("/public", express.static('./public'));

// Create router
var router = require('./router');

//router listens on  /root
app.use('/', router);

// //connect to database 
 database( function(){
    app.listen(app.get('port'), function(){
        console.log("Express server listening on port " + app.get('port'));
        console.log("You application is running. You should be able to connect to it on http://localhost:" + app.get('port') );
    });
});

