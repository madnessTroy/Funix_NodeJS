const Product = require('../models/product');

// Product controller
// Products list
exports.getProducts = (req, res, next) => {
	Product.fetchAll()
		.then((products) => {
			res.render('shop/product-list', {
				prods: products,
				pageTitle: 'All Products',
				path: '/products',
			});
		})
		.catch((err) => {
			console.log(err);
		});
};
// Product detail
exports.getProduct = (req, res, next) => {
	const prodId = req.params.productId;
	// Product.findAll({ where: { id: prodId } })
	// 	.then((product) => {
	// 		res.render("shop/product-detail", {
	// 			product: product[0],
	// 			pageTitle: product.title,
	// 			path: "/products",
	// 		});
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 	});
	Product.findById(prodId)
		.then((product) => {
			res.render('shop/product-detail', {
				product: product,
				pageTitle: product.title,
				path: '/products',
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

//
exports.getIndex = (req, res, next) => {
	Product.fetchAll()
		.then((products) => {
			res.render('shop/index', {
				prods: products,
				pageTitle: 'Shop',
				path: '/',
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

// Cart controller
exports.getCart = (req, res, next) => {
	req.user
		.getCart()
		.then((products) => {
			res.render('shop/cart', {
				path: '/cart',
				pageTitle: 'Your Cart',
				products: products,
			});
		})
		.catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
	const prodId = req.body.productId;
	Product.findById(prodId)
		.then((product) => {
			return req.user.addToCart(product);
		})
		.then(() => {
			res.redirect('/cart');
		});
};

exports.postCartDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	req.user
		.daleteItemFromCart(prodId)
		.then(() => {
			res.redirect('/cart');
		})
		.catch((err) => console.log(err));
};

//
exports.postOrder = (req, res, next) => {
	req.user
		.getCart()
		.then((cart) => {
			return cart.getProducts();
		})
		.then((products) => {
			req.user
				.createOrder()
				.then((order) => {
					return order.addProducts(
						products.map((product) => {
							product.orderItem = {
								quantity: product.cartItem.quantity,
							};
							return product;
						})
					);
				})
				.catch((err) => console.log(err));
		})
		.then(() => {
			res.redirect('/order');
		})
		.catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
	res.render('shop/orders', {
		path: '/orders',
		pageTitle: 'Your Orders',
	});
};

exports.getCheckout = (req, res, next) => {
	res.render('shop/checkout', {
		path: '/checkout',
		pageTitle: 'Checkout',
	});
};
