# Multi Seller Online Managment System 

 * Users: Buyers, Sellers, Admin

 * Buyer: Register, Login, View/Search producs, Place/Cancle/Track orders.
 * Seller: Rgister, Login, Create/Update/Delete product, Accept/Reject orders, Ship/Deliver orders.
 * Admin: Manage + View everything.

## Technologies Used :

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL
* Prisma ORM

### Authentication & Security

* bcrypt (Password Hashing)
* JSON Web Tokens (JWT)

### Cashing

* Redis

### Containerization

* Docker
* Docker Compose

### API Testing

* Postman

### Database Management & Visualization

* pgAdmin 4

### Environment Configuration

* dotenv


## Database Design :

### tables :
 * User - ID, Name, Email, Password, Role, CreatedAt
 * Product - ID, SellerID, Name, Description, Stock, Price
 * Order - ID, BuyerID, ProductID, Quantity, TotalPrice, Status

### Relationships :
 * Seller and Product - 1 seller can have many product.
 * Buyer and Order - 1 buyer can have many orders.
 * Product and Order - 1 product can be ordered many times.

## Inventory Logic :

### Stock >= Quantity-
 * accept order and Stock = Stock - Quantity. 

### Stock < Quantity-
 * Decline order.




## Redis :
Cloud Cache that help in fast and efficient searching.


## How to Compose using Docker....

* import the whole Folder on your local Machine.
* use command "docker compose up --build" or "docker compose up --build -d"for detached mode.
