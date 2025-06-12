## CRUD Web App

#### How to run the project

```console

npm install

node index.js

```

#### List Product API

```
GET http://127.0.0.1:3000/api/v1/products
```

#### Find Product API

```
GET http://127.0.0.1:3000/api/v1/products/1
```

#### Create Product API

```
POST http://127.0.0.1:3000/api/v1/products

Request body
{
	"id": 0,
	"name": "Leather Wallet",
	"description": "Premium leather wallet with multiple compartments",
	"price": 799,
	"category": "Accessories"
}
```

#### Update Product API

```
PATCH http://127.0.0.1:3000/api/v1/products/1

Request body
{
	"id": 1,
	"name": "Leather Wallet UPDATED",
	"description": "Premium leather wallet with multiple compartments",
	"price": 799,
	"category": "Accessories"
}
```

#### Delete Product API

```
DELETE http://127.0.0.1:3000/api/v1/products/2
```
