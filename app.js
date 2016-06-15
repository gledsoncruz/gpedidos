var http = require('http');
var app = require('./config/express')();
require('./config/database.js')(process.env.MONGODB_URI);

// mongodb://efood:efood123@ds049104.mongolab.com:49104/efood


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express Server escutando na porta ' +
              app.get('port'));
});

