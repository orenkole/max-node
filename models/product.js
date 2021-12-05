const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const p = path.join(
	path.dirname(require.main.filename),
	'data',
	'products.json'
);

const getProductsFromFile = cb => {
	fs.readFile(p, (err, fileContent) => {
		if(err) {
			return cb([]);
		}
		cb(JSON.parse(fileContent));
	})
}

module.exports = class Product {
	constructor(id, title, imageUrl, description, price) {
		this.id = id;
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}

	save() {
		getProductsFromFile(products => {
			if (this.id) {
				const updatedProducts = products.map(product => product.id === this.id ? this : product);
				fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
					console.log(err)
				})
			} else {
				this.id = crypto.randomBytes(8).toString("hex");
				products.push(this);
				fs.writeFile(p, JSON.stringify(products), (err) => {
					console.log(err)
				})
			}
		})
	}

	static fetchAll(cb) {
		getProductsFromFile(cb);
	}

	static findById(id, cb) {
		getProductsFromFile(products => {
			const product = products.find(product => product.id = id);
			cb(product);
		})
	}

	static deleteById(id) {
		getProductsFromFile(products => {
			const updatedProducts = products.filter(product => product.id !== id);
			fs.writeFile(p, JSON.stringify(updatedProducts))
		})
	}
}