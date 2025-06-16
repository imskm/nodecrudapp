const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let lastProductId = 10;
const products = [
  {
    "id": 1,
    "name": "Test product",
    "description": "Test product description",
    "price": 499,
    "category": "Shoes"
  },
  {
    "id": 2,
    "name": "Running Sneakers",
    "description": "Lightweight sneakers ideal for running and daily use",
    "price": 1299,
    "category": "Shoes"
  },
  {
    "id": 3,
    "name": "Wireless Earbuds",
    "description": "Compact and powerful wireless earbuds with noise cancellation",
    "price": 2199,
    "category": "Electronics"
  },
  {
    "id": 4,
    "name": "Smartwatch X",
    "description": "Track your fitness and notifications with Smartwatch X",
    "price": 3499,
    "category": "Electronics"
  },
  {
    "id": 5,
    "name": "Leather Wallet",
    "description": "Premium leather wallet with multiple compartments",
    "price": 799,
    "category": "Accessories"
  },
  {
    "id": 6,
    "name": "Gaming Mouse",
    "description": "High precision RGB gaming mouse with customizable buttons",
    "price": 1599,
    "category": "Electronics"
  },
  {
    "id": 7,
    "name": "Cotton T-Shirt",
    "description": "Soft cotton t-shirt available in multiple colors",
    "price": 499,
    "category": "Clothing"
  },
  {
    "id": 8,
    "name": "Backpack Pro",
    "description": "Durable and water-resistant backpack for travel and work",
    "price": 1899,
    "category": "Bags"
  },
  {
    "id": 9,
    "name": "Bluetooth Speaker",
    "description": "Portable speaker with deep bass and long battery life",
    "price": 2499,
    "category": "Electronics"
  },
  {
    "id": 10,
    "name": "Sports Water Bottle",
    "description": "Stainless steel insulated bottle for hot and cold drinks",
    "price": 699,
    "category": "Fitness"
  }
];

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/api/v1/products', (req, res) => {
	res.setHeader('Content-Type', 'applicationn/json');
	let result = products;
	let page = 1;
	const nitems = 3;
	console.log(req.query);
	if (v = req.query.q?.trim()) {
		result = result.filter(item => item.name?.toLowerCase().includes(v.toLowerCase()));
	}
	if (v = req.query.page?.trim()) {
		result = result.slice((Number(v) - 1) * nitems, (Number(v) - 1) * nitems + nitems);
	}
	res.send(result);
});

app.get('/api/v1/products/:id', (req, res) => {
	res.setHeader('Content-Type', 'applicationn/json');
	res.send(products.find((p) => p.id == req.params.id));
});

app.post('/api/v1/products', (req, res) => {
	const data = req.body;
	lastProductId += 1;
	data['id'] = lastProductId;
	products.push(data);
	res.send(products);
});

app.patch('/api/v1/products/:id', (req, res) => {
	const data = req.body;
	const id = req.params.id;
	if ((idx = products.findIndex((p) => p.id == id)) != -1) {
		req.body['id'] = id;
		products[idx] = req.body;
	}
	res.send(products);
});

app.delete('/api/v1/products/:id', (req, res) => {
	const id = req.params.id;
	if ((idx = products.findIndex((p) => p.id == id)) != -1) {
		products.splice(idx, 1);
	}
	res.send(products);
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
