const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let lastProductId = 0;
const products = [];

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/api/v1/products', (req, res) => {
	res.setHeader('Content-Type', 'applicationn/json');
	res.send(products);
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
