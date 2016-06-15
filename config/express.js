var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var helmet = require('helmet');

module.exports = function() {
    var app = express();
    var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');

    next();
}
    // variavel de ambiente
    app.set('port', (process.env.PORT || 3000));
    app.use(allowCrossDomain);

    // middleware
    app.use(helmet.hidePoweredBy({ setTo: 'PHP 5.5.14' }));
    //app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(bodyParser.urlencoded({extended: true}));
  	app.use(bodyParser.json());
    app.use(express.static('./public'));

  	load('models', {cwd: 'app'})
  		.then('controllers')
  		.then('routes')
  		.into(app);

    return app;


};