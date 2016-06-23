var express = require('express');

module.exports = function(app){

	var loginCtrl = app.controllers.loginCtrl;
	var userCtrl = app.controllers.userCtrl;
	var storeCtrl = app.controllers.storeCtrl;
	var productCtrl = app.controllers.productCtrl;
	var offerCtrl = app.controllers.offerCtrl;

	var router = express.Router();
    app.use('/api', router);

	router.route('/by')
	   .get(function(req, res){
	   	//console.log('response: '+ req);
		res.json({"appname":"GPedidos-Sistema de Pedidos", "author":"Gledson Cruz", "email":"gledson.cruz@gmail.com"});
	});

    router.route('/signup').post(userCtrl.save);
    router.route('/login')
		.post(loginCtrl.authenticate);



	router.route('/products')
		.get(productCtrl.findAll);

	router.route('/offers')
		.get(offerCtrl.findAll)
		.post(offerCtrl.save);

	router.route('/productsInOffers')
		.get(productCtrl.productsInOffers);

	router.route('/offersPerProduct/:idProd')
		.get(offerCtrl.offersPerProduct);






	//ZONA RESTRITA
    //router.use(loginCtrl.validateJWT);
    router.route('/me')
		.get(function(req, res){
			res.json(req.decoded);
		});

   	router.route('/users/:id')
		.get(/*loginCtrl.authorize, */userCtrl.findById)
		.delete(/*loginCtrl.authorize, */userCtrl.delete)
		.put(/*loginCtrl.authorize, */userCtrl.update);

	router.route('/users')
		.get(userCtrl.findAll);

	router.route('/users')
		.get(userCtrl.findAll);

	//STORES

	router.route('/stores')
		.get(storeCtrl.findAll)
		.post(storeCtrl.save);

	router.route('/stores/:id')
		.get(/*loginCtrl.authorize, */storeCtrl.findById)
		.delete(/*loginCtrl.authorize, */storeCtrl.delete)
		.put(/*loginCtrl.authorize, */storeCtrl.update);

	//PRODUCTS

	router.route('/products')
		.post(productCtrl.save);

	router.route('/products/:id')
		.get(/*loginCtrl.authorize, */productCtrl.findById)
		.delete(/*loginCtrl.authorize, */productCtrl.delete)
		.put(/*loginCtrl.authorize, */productCtrl.update);

	//OFFERS

	//router.route('/offers')
	//	.post(offerCtrl.save);

	router.route('/offers/:id')
		.get(/*loginCtrl.authorize, */offerCtrl.findById)
		.delete(/*loginCtrl.authorize, */offerCtrl.delete)
		.put(/*loginCtrl.authorize, */offerCtrl.update);

	app.use(function(req,res){
	    res.status(404).send({message: 'Erro 404: Rota não encontrada'});
	});

}
