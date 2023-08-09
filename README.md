# E-commerce API

Our E-commerce API is constructed using Express.js and Typescript. It leverages the power of Sequelize to efficiently handle interactions and management of our primary MySQL database. To ensure secure user authentication, we implement JWT tokens. This robust authentication system enables users to seamlessly create accounts, manage their shopping carts and favorites, and make purchases for the wide range of products available on our platform.

# ✨Getting Started
### 🛠️ Installation
```shell
git clone https://github.com/JSD-0423/backend-final-2.git
cd backend-final-2
npm install
npm run dev
```
### 🔧 Configuration
To configure the application, you must create a .env file in the root directory of the project. The following variables must be defined in the .env file:
```
# Random value to use as JWT key
SECRET_KEY=
```
And Also you should configure Seqeulize by installing sequelize-cli and running sequlize-cli init
```
seqeulize-cli init
```
Once you've made the necessary adjustments to the config/config.json file to align with your database configuration, proceed to execute the seeders.
```
seqeulize-cli db:seed:all
```
### 🌟 Features
E-commerce API provides the following:

* Fetching Products: Receive a JSON response with the specified categories [new arrivals, handpicked, discounts, popular].
* User Registration/Login: By creating an account, you gain the capability to add items to your cart and favorites, as well as complete product purchases.

## 📊 Database Schema

[schema](https://lucid.app/lucidchart/f5b923ed-df74-498e-bedb-61a0d2f8de4f/edit?viewport_loc=-104%2C-491%2C1837%2C884%2C0_0&invitationId=inv_d3cb9fb4-1cf3-4c3c-8997-86dcd87f95e3)

## 📎 API Documentation

[Documentation]( https://hackmd.io/xneSCQXwRJOw-ju00Mu4Kw)

## 🎨 Design

[Design](https://www.figma.com/file/bHnMNcAuXI1Zd6lyf6Oj1X/PWA-eCommerce-Theme-(Community)?type=design&node-id=184-0&mode=design&t=YYBh5qmVZNlRpmCM-0)
