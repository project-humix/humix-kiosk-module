var express = require('express');
var app = express(); 						// create our app w/ express
var port = process.env.PORT || 8000; 				// set the port
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var io = require('socket.io'),
    http = require('http'),
    server = http.createServer(app),
    io = io.listen(server);




// START HUMIX SETUP

var config = {
    "moduleName" : "humix-kiosk-module",
    "commands" : ["text", "image", "video", "clock", "icon"],
    "events" : [],
    "log" : [
      {
        file : './humix-kiosk-module.log',
        level : 'info'
      }
    ],
    "debug" : true
};

var HumixSense = require('humix-sense'),
    humix = new HumixSense(config),
    hsm;


function trimQuote(text){

    return text.replace(/['"]+/g, '')
}

humix.on('connection', function(humixSensorModule){
    hsm = humixSensorModule;
    var log = hsm.getLogger();

    hsm.on("text", function (data) { 
        
        var input = {
            type: 'text',
            value: trimQuote(data)
        };
        io.sockets.emit('update', input);
    });

    hsm.on("image", function (data) { 
        var input = {
            type: 'image',
            value: trimQuote(data)
        }
        io.sockets.emit('update', input);
    });

    hsm.on("video", function (data) { 
        var input = {
            type: 'video',
            value: trimQuote(data)
        }
        io.sockets.emit('update', input);
    });

    hsm.on("clock", function (data) { 
        var input = {
            type: 'clock',
            value: trimQuote(data)
        }
        io.sockets.emit('update', input);
    });

    hsm.on("icon", function (data) { 
        var input = {
            type: 'icon',
            value: trimQuote(data)
        }
        io.sockets.emit('update', input);
    });

});

// END HUMIX SETUP


app.use(express.static('./public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


// routes ======================================================================


// listen (start app with node server.js) ======================================
server.listen(port);
console.log("App listening on port " + port);


// socket io
io.on('connection', function (socket) {

    console.log('socket connected');


    socket.on('message', function (from, msg) {

      console.log('recieved message from', 
                  from, 'msg', JSON.stringify(msg));

    });
  });

app.post('/api/display', function (req, res) {
    
    var input = req.body;

    io.sockets.emit('update', {
    type: input.type,
    value: input.value
    });

    res.end();
});

//require('./app/routes.js')(app);
