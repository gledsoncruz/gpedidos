var express = require('express');

module.exports = function(app){

	var router = express.Router();
    app.use('/gpedidos/api', router);

	router.route('/me')
	   .get(function(req, res){
	   	//console.log('response: '+ req);
		res.json({"author":"Gledson Cruz"});
	});

	app.use(function(req,res){
	    res.status(404).send({message: 'Erro 404: Rota não encontrada'});
	});

}
