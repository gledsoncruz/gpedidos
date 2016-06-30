var express = require('express');

module.exports = function(app){

	var appInfoCtrl = app.controllers.appInfoCtrl;
	var loginCtrl = app.controllers.loginCtrl;
	var userCtrl = app.controllers.userCtrl;
	var storeCtrl = app.controllers.storeCtrl;
	var productCtrl = app.controllers.productCtrl;
	var offerCtrl = app.controllers.offerCtrl;
	var categoryCtrl = app.controllers.categoryCtrl;

	var router = express.Router();
    app.use('/api', router);

    router.route('/app-info')
    	.get(appInfoCtrl.appInfos);

	router.route('/by')
	   .get(function(req, res){
		res.json({"appname":"GPedidos-Sistema de Pedidos", "author":"Gledson Cruz", "email":"gledson.cruz@gmail.com"});
	});

    router.route('/signup')
    	.post(userCtrl.save);

    router.route('/login')
		.post(loginCtrl.authenticate);

	router.route('/stores')
		.get(storeCtrl.findAll);

	router.route('/stores/:id')
		.get(storeCtrl.findById);

	router.route('/products')
		.get(productCtrl.findAll);

	router.route('/products/:id')
		.get(productCtrl.findById);

	router.route('/categories')
		.get(categoryCtrl.findAll);

	router.route('/categories/:id')
		.get(categoryCtrl.findById);

	router.route('/offers')
		.get(offerCtrl.findAll);

	router.route('/offers/:id')
		.get(offerCtrl.findById);

	router.route('/offersActives')
		.get(offerCtrl.findOffersActives);

	router.route('/productsInOffers')
		.get(productCtrl.productsInOffers);

	router.route('/offersPerProduct/:id')
		.get(offerCtrl.offersPerProduct);

	router.route('/offersPerStore/:id')
		.get(storeCtrl.offersPerStore);

	router.route('/categoriesWithOffers')
		.get(categoryCtrl.findCategoryWithOffers);

	//ZONA RESTRITA
    router.use(loginCtrl.validateJWT);

    //USERS

    router.route('/me')
		.get(function(req, res){
			res.json(req.decoded);
		});

	router.route('/users')
		.get(loginCtrl.authorize, userCtrl.findAll);

   	router.route('/users/:id')
		.get(loginCtrl.authorize, userCtrl.findById)
		.delete(loginCtrl.authorize, userCtrl.delete)
		.put(loginCtrl.authorize, userCtrl.update);

	//STORES

	router.route('/stores')
		.post(loginCtrl.authorize, storeCtrl.save);

	router.route('/stores/:id')
		.delete(loginCtrl.authorize, storeCtrl.delete)
		.put(loginCtrl.authorize, storeCtrl.update);

	//PRODUCTS

	router.route('/products')
		.post(loginCtrl.authorize, productCtrl.save);

	router.route('/products/:id')
		.delete(loginCtrl.authorize, productCtrl.delete)
		.put(loginCtrl.authorize, productCtrl.update);

	//CATEGORIES

	router.route('/categories')
		.post(loginCtrl.authorize, categoryCtrl.save);

	router.route('/categories/:id')
		.delete(loginCtrl.authorize, categoryCtrl.delete)
		.put(loginCtrl.authorize, categoryCtrl.update);

	//OFFERS

	router.route('/offers')
		.post(loginCtrl.authorize, offerCtrl.save);

	router.route('/offers/:id')
		.delete(loginCtrl.authorize, offerCtrl.delete)
		.put(loginCtrl.authorize, offerCtrl.update);


	app.use(function(req,res){
	    res.status(404).send({message: 'Erro 404: Rota não encontrada'});
	});

}
