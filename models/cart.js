const fs = require('fs');
const path = require('path')

const p = path.join(
	path.dirname(require.main.filename),
	'data',
	'cart.json'
)

module.exports = class Cart {
	constructor() {
		this.products = [];
		this.totalPrice = 0;
	}

	static addProduct(id, productPrice) {
		// Fetch the previous cart
		fs.readFile(p, (err, fileContent) => {
			let cart = {products: [], totalPrice: 0}
			if(!err) {
				cart = JSON.parse(fileContent)
			}
			// Analize the cart => find existing products
			const existingProduct = cart.products.find(prod => prod.id === id);
			let updatedProduct;
			if(existingProduct) {
				updatedProduct = {...existingProduct};
				updatedProduct = updatedProduct.qty + 1;
				cart.products = cart.products.map(prod => prod.id === id ? updatedProduct : prod)
			} else {
				updatedProduct = {id: id, qty: 1},
				cart.products = [...cart.products, updatedProduct]
			}
			cart.totalPrice = cart.totalPrice + +productPrice;
			fs.writeFile(p, JSON.stringify(cart), err => {console.log(err)});
		})
	}
}