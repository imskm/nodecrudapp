const express = require('express');
const cors = require('cors');

const multer  = require('multer');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up storage (optional — stores files in /uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/'); // create this folder or handle it
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

const upload = multer({ storage });


let lastProductId = 10;
const products = [
  {
    "id": 1,
    "name": "Test product",
    "description": "Test product description",
    "price": 499,
    "category": "Shoes",
	"image_url": "https://placehold.co/400x400?text=Product"
  },
  {
    "id": 2,
    "name": "Running Sneakers",
    "description": "Lightweight sneakers ideal for running and daily use",
    "price": 1299,
    "category": "Shoes",
	"image_url": "https://placehold.co/400x400?text=Product"
  },
  {
    "id": 3,
    "name": "Wireless Earbuds",
    "description": "Compact and powerful wireless earbuds with noise cancellation",
    "price": 2199,
    "category": "Electronics",
	"image_url": "https://placehold.co/400x400?text=Product"
  },
  {
    "id": 4,
    "name": "Smartwatch X",
    "description": "Track your fitness and notifications with Smartwatch X",
    "price": 3499,
    "category": "Electronics",
	"image_url": "https://placehold.co/400x400?text=Product"
  },
  {
    "id": 5,
    "name": "Leather Wallet",
    "description": "Premium leather wallet with multiple compartments",
    "price": 799,
    "category": "Accessories",
	"image_url": "https://placehold.co/400x400?text=Product"
  },
  {
    "id": 6,
    "name": "Gaming Mouse",
    "description": "High precision RGB gaming mouse with customizable buttons",
    "price": 1599,
    "category": "Electronics",
	"image_url": "https://placehold.co/400x400?text=Product"
  },
  {
    "id": 7,
    "name": "Cotton T-Shirt",
    "description": "Soft cotton t-shirt available in multiple colors",
    "price": 499,
    "category": "Clothing",
	"image_url": "https://placehold.co/400x400?text=Product"
  },
  {
    "id": 8,
    "name": "Backpack Pro",
    "description": "Durable and water-resistant backpack for travel and work",
    "price": 1899,
    "category": "Bags",
	"image_url": "https://placehold.co/400x400?text=Product"
  },
  {
    "id": 9,
    "name": "Bluetooth Speaker",
    "description": "Portable speaker with deep bass and long battery life",
    "price": 2499,
    "category": "Electronics",
	"image_url": "https://placehold.co/400x400?text=Product"
  },
  {
    "id": 10,
    "name": "Sports Water Bottle",
    "description": "Stainless steel insulated bottle for hot and cold drinks",
    "price": 699,
    "category": "Fitness",
	"image_url": "https://placehold.co/400x400?text=Product"
  }
];

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/api/v1/products', (req, res) => {
	res.setHeader('Content-Type', 'applicationn/json');
	let result = products;
	let page = 1;
	let nitems = 3;
	let total = 0;
	if ((v = Number(req.query.items?.trim())) && v > 0) {
		nitems = v;
	}
	if (req.query.q?.trim() || req.query.category?.trim()) {
		result = result.filter((item) => {
			v = req.query.q?.trim();
			if (v && item.name?.toLowerCase().includes(v.toLowerCase())) {
				return true;
			}
			v = req.query.category?.trim();
			if (v && item.category?.toLowerCase().includes(v.toLowerCase())) {
				return true;
			}

			return false;
		});
	}

	total = result.length;
	if (v = req.query.page?.trim()) {
		result = result.slice((Number(v) - 1) * nitems, (Number(v) - 1) * nitems + nitems);
	}

	const data = {
		data: result,
		total: total,
		items_per_page: nitems,
	};
	res.send(data);
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

app.post('/api/v1/products/:id/upload-image', upload.single('file'), (req, res) => {
	const id = req.params.id;
	if (!(product = products.find((p) => p.id == req.params.id))) {
		res.status(404);
		return res.send();
	}

	// 'file' is the field name used in curl or form
	console.log('Uploaded file:', req.file);

	if (!req.file) {
		return res.status(400).send('No file uploaded.');
	}

	product.image_url = `http://127.0.0.1:3000/uploads/${req.file.filename}`;
	console.log(product);

	res.send(product);
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
