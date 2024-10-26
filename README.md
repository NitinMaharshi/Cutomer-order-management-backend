# E-Commerce API

This project is a backend API for an e-commerce platform, enabling CRUD operations on Users, Products, Orders, and Colors. The application provides functionality for user authentication, product management, order processing, and color management, supporting secure access and optimized response handling.

## Table of Contents

- [Technologies](#technologies)
- [Project Setup](#project-setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Auth](#auth)
  - [Users](#users)
  - [Products](#products)
  - [Orders](#orders)
  - [Colors](#colors)

## Technologies

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Token (JWT) for authentication

## Project Setup

1. **Clone the repository**:
   bash
   git clone https://github.com/NitinMaharshi/Cutomer-order-management-backend.git
   cd ecommerce-api
2. **Install Dependencies & Start the Server**:
   bash
   npm install
   npm run start

## API Endpoints

### Auth
- **Login**: `POST /api/auth/login`
  - **Request**:
    json
    {
      "email": "mailto:user@example.com",
      "password": "password123"
    }
    
  - **Response**:
    json
    {
      "user": {
        "_id": "userId",
        "email": "mailto:user@example.com"
      },
      "token": "jwt-token"
    }
    

- **Logout**: `POST /api/auth/logout`
  - **Authorization**: Requires JWT in the Authorization header.
  - **Response**: `204 No Content`

### Users
- **Create User**: `POST /api/users`
  - **Request**:
    json
    {
      "name": "John Doe",
      "email": "mailto:johndoe@example.com",
      "password": "password123"
    }
    
  - **Response**:
    json
    {
      "_id": "userId",
      "name": "John Doe",
      "email": "mailto:johndoe@example.com"
    }
    

- **Get All Users**: `GET /api/users` (Admin only)
  - **Authorization**: Requires JWT in the Authorization header.

### Products
- **Create Product**: `POST /api/products`
  - **Request**:
    json
    {
      "name": "T-Shirt",
      "price": 29.99,
      "sizes": ["S", "M", "L"]
    }
    
  - **Response**:
    json
    {
      "_id": "productId",
      "name": "T-Shirt",
      "price": 29.99,
      "sizes": ["S", "M", "L"]
    }
    

- **Get All Products**: `GET /api/products`

### Orders
- **Create Order**: `POST /api/orders`
  - **Authorization**: Requires JWT in the Authorization header.
  - **Request**:
    json
    {
      "productIds": ["productId1", "productId2"],
      "totalAmount": 59.98
    }
    
  - **Response**:
    json
    {
      "_id": "orderId",
      "customerId": "userId",
      "products": ["productId1", "productId2"],
      "totalAmount": 59.98
    }
    

### Colors
- **Create Color**: `POST /api/colors`
  - **Request**:
    json
    {
      "name": "Red",
      "hexCode": "#FF0000"
    }
    
  - **Response**:
    json
    {
      "_id": "colorId",
      "name": "Red",
      "hexCode": "#FF0000"
    }
    

- **Get All Colors**: `GET /api/colors`
## Environment Variables

Create a `.env` file in the root directory with the following variables:

plaintext
APP_PORT=3000
MONGODB_URL=your_mongodb_url
SECRET_KEY=your_jwt_secret
APP_ENV=development


```
