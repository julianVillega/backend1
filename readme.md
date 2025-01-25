

# Challenge 3
  * [How to test challenge 3](#how-to-test-challenge-3)
  * [Features implemented in this challenge](#features-implemented-in-challenge-3)
  # How to test challenge 3
  To test the features implemented in this challenge:
  1. Clone this git repository.
      ```bash
      git clone https://github.com/julianVillega/backend1.git
      ```  
  2. Position the terminal in the project's root directory.
      ```bash
      cd ./backend1
      ```  
  3. checkout to a new branch named challenge3 by running this command:
      ```bash
      git checkout -b challenge3
      ```  
  4. pull the changes from the remote repository, by running this command:
      ```bash
      git pull origin challenge3
      ```  
  5. Install the necessary dependencies by running the command:
      ```bash
      npm i
      ```
  6. create a .env file within the backend1 folder.
  within this file copy the credentials provided by me.    
  7. Start the server by running the command:  
      ```bash
      npm run dev
      ```
  8. open a browser.
  9. Use the nav bar to navigate and test the different views

  You can use the following credentials to log in: 
  * **email:** michael@mail.com
  * **password:** aasdasd222d
  Or you can create your own user

  ### DISCLAIMERS:
  Shutting down the backend application will not logout any users.

  To view the user cart you must type the url manually since there is no navigation link to the user cart, sorry about that. The link is as follows http://localhost:8000/cart/theUserId

  # Features implemented in challenge 3
  
  ## Switched form File System persistence to MongoDB
  In this challenge, all controllers and managers have been redone except this time using MongoDB to implement the persistence logic.
  To do this I chose to create generic classes for the managers and controller, these generic classes implement basic crud operations. This allowed me to reuse this generic code, while still being able to extend those generic classes and override the inherited behavior when needed. In order to be able to achieve this with the controllers, an extra step was needed due to the fact that the controllers method's are passed as callback functions in the routers. When a method is passed as a callback, the binding between the function been passed and the object it came from is lost. An implication of this is that the "this" property becomes undefined within the function. To solve this issue, within the controller's constructor I forcefully bind each method to "this".

  ## Implemented users carts
  Another major improvement was the addition of the user's cart view. In this view the user can see all products in the cart. This required the implementation of the cart's api logic as well as the frontend changes to allow the user to add products to the cart. Note that as of this release, it is not yet possible to modify the quantities of each products once they have been added to the cart.

  ## Pagination for products views
  In the previous release, both the home and products admin view, displayed a huge list containing all products in the e-commerce. For this release, pagination has been added to both views, allowing for a better user experience. As part of this it, now it's also possible to filter products by category, however due to time constrains there is not category filter in the UI. To filter products by category, a category query string parameter must be specified manually.

# Challenge 2

## Table of contents:
  * [How to test challenge 2](#how-to-test-challenge-2)
  * [Features implemented in this challenge](#features-implemented-in-challenge-2)
  * [About Authentication](#about-authentication)


# How to test challenge 2
  To test the features implemented in this challenge:
  1. Clone this git repository.
      ```bash
      git clone https://github.com/julianVillega/backend1.git
      ```  
  2. Position the terminal in the project's root directory.
      ```bash
      cd ./backend1
      ```  
  3. checkout to a new branch named challange2secondtry by running this command:
      ```bash
      git checkout -b challange2secondtry
      ```  
  4. pull the changes from the remote repository, by running this command:
      ```bash
      git pull origin challange2secondtry
      ```  
  5. Install the necessary dependencies by running the command:
      ```bash
      npm i
      ```
  6. Start the server by running the command:  
      ```bash
      npm run dev
      ```
  7. open a browser.
  8. Use the nav bar to navigate and test the different views

  You can use the following credentials to log in: 
  * **email:** user1@mail.com
  * **password:** user1pass

  ### DISCLAIMER:
  Shutting down the backend application will not logout any users.

## Features implemented in challenge 2
  This challenge consisted of creating a frontend to consume the Rest Api created in the previous challenge.
  The views created include:
  * **Login:**
    *  A view containing a simple login form, upon a successful authentication the user is redirected to the user profile view.
    * **URL:** /users/login
  * **Register:**
    * A simple registration form that allows users to create an account. Upon successful account creation, the user is redirected to the login page.
    * **URL:** /users/register
  * **Home**
    * A basic homepage listing every product on the ecomerce. Viewing this page does not require an account.
  * **User Profile:**
    * A page displaying the user account info, including email, role an photo. To access this page the user must be loged in.
    * **URL:** /users/:userId
  * **Product Admin:**
    * A page for creating, modifying and deleting products. Access to this account requires being loged in.
    * **URL:** /products/admin/:userId

## About authentication:

For this challenge authentication was implemented in an oversimplified way, ***for demonstration purposes only***:

Every user has, in addition to their regular information, (email, password, role, photo) a boolean variable that indicates whether the user is online or not. Logging in sets this variable to true, and logging out sets it to false.
When a user successfully logs in, the server responds with the user's id. The client stores said id and sends it along with the subsequent requests as a url parameter.
When accessing urls that require authentication, a user id must be provided as a url parameter. If that user is not online, a redirection to the login page is returned.

It is very clear that this is not secure by any means, but it's good enough to demonstrate how the interaction between the client and the server works.

A better alternative would be to generate a session token upon user log in, and assign said token to the user logging in. Additionally, this token could have an expiration date.

# Challenge 1

## Table of contents:
  * [How to test this API](#how-to-test-this-api):
  * [Implemented Features](#features-implemented): A document containing the requirements for this challenge
  * [API Endpoints](#users-endpoints): A brief description of the different API endpoints implemented in this challenge.
  * [User Description](#user-description): A detailed description of the user's object fields.
  * [Product Description](#product-description): A detailed description of the product's object fields.

## How to test this API:
  
  In order to test this API, follow the steps:
  
  1. Clone this git repository.
      ```bash
      git clone https://github.com/julianVillega/backend1.git
      ```  
  2. Position the terminal in the project's root directory.
      ```bash
      cd ./backend1
      ```  
  3. checkout to a new branch named challange1 by running this command:
      ```bash
      git checkout -b challange1
      ```  
  4. pull the changes from the remote repository, by running this command:
      ```bash
      git pull origin challange1
      ```  
  5. Install the necessary dependencies by running the command:
      ```bash
      npm i
      ```
  6. Start the server by running the command:  
      ```bash
      npm run dev
      ```
  7. Download the following postman collections of tests:    
      * [user tests](https://drive.google.com/file/d/1vr-zKxRb2QyqSGPWsodxfGdH0URucRF-/view?usp=sharing)
      * [products tests](https://drive.google.com/file/d/12P5KMiEcdmVPn3LbQD1jgFRmVWUmw7xE/view?usp=sharing)  
  
  8. Open Postman and import the downloaded collections.

  9. Run individual tests or entire folders. If you plan on running entire folders of tests at once, make sure to add a delay of at least 500 milliseconds in between each test.

  ***NOTE:*** Within the folder src/data/fs/files, you'll find the following files:
  * products.json
  * users.json
  * testProducts.json
  * testUsers.json
  

  All operations are performed over the users.json and products.json files. The testUsers.json and testProducts.json are there to facilitate the testing of the application. After running some tests, you can use the testUsers.json and testProducts.json files to restore the original content of the users.json and products.json files.
  

## Features implemented:

As required in the [this document](https://docs.google.com/presentation/d/1BVsH1ABIKOjct2PNRRzTXxCRApwMA7JAr9NZsXuCTsE/edit#slide=id.g120b44b0dae_0_1259), the following features were implemented :

## Users endpoints:
<details>
  <summary>POST/api/users </summary>
  
  * **Purpose:** Create a new user  
  * **Query params:** None
  * **Url params:** None
  * **Request body:** Json string containing the user data
  * **Example:**
    * **Request:**
      * **Url:** /api/users
      * **Http Method:** POST
      * **Request body:**
        ```json
        {
          "email": "michael@mail.com",      //required
          "password": "someStrongPassword", //required
          "photo":"https://something.com",  //optional
          "role": "user"                    //optional 
        }
        ```
    * **Response:**
      * **Status Code:** 201
      * **Json:**
        ```json
        {
        "message": "created a new user with id  f8e3addebb42b79f7d2b0686",
          "response": "f8e3addebb42b79f7d2b0686"
        }
        ```
</details>

<details>
  <summary>PUT/api/users/:Uid</summary>
  
  * **Purpose:** Update an existing user  
  * **Query params:** 
    * **Uid:** The id of the user to be updated
  * **Url params:** None
  * **Request body:** Json string containing the user data
  * **Example:**
    * **Request:**
      * **Url:** /api/users/1935c70b7ae4fb67b8247420
      * **Http Method:** PUT
      * **Request body**:
        ```json
        {
          "email": "mcNewEmail@mail.com",      //required
          "password": "aStrongerPassword",     //required
          "photo":"https://somethingElse.com", //optional
          "role": "new role"                   //optional 
        }
        ```
    * **Response:**
      * **Status Code:** 200
      * **Json:**
        ```json
        {
          "message": "updated user with id 1935c70b7ae4fb67b8247420",
          "response": {
            "id": "1935c70b7ae4fb67b8247420",
            "photo": "https://somethingElse.com",
            "email": "mcNewEmail@mail.com",
            "password": "aStrongerPassword",
            "role": "new role"
          }
        }
        ```
</details>

<details>
  <summary> DELETE/api/users/:Uid </summary>

  * **Purpose:** Delete a user
  * **Query params:** 
  * **Uid:** The id of the user to delete
  * **Url params:** None
  * **Request body:** None
  * **Example:**
    * **Request:**
      * **Url:** /api/users/1935c70b7ae4fb67b8247420
      * **Http Method:** DELETE
    * **Response:**
      * **Status Code:** 200
      * **Json:**
        ```json
        {
            "message": "deleted user with id 1935c70b7ae4fb67b8247420",
            "response": true
        }
        ```
</details>

<details>
  <summary> GET/api/users?role </summary>

  * **Purpose:** Read users
  * **Query params:** 
    * **role:** Used to filter users by role
  * **Url params:** None
  * **Request body:** None
  * **Example 1:**
    * **Request:**
      * **Url:** /api/users
      * **Http Method:** GET  
    * **Response:**
      * **Status Code:** 200
      * **Json:**
        ```json
        {
          "message": "fetched 4 users",
          "response": [
              {
                  "id": "dbeb5fa4cdae91d8ba68121c",
                  "photo": "https://random.imagecdn.app/200/200",
                  "email": "user2@mail.com",
                  "password": "user2pass",
                  "role": "0"
              },
              //...
              // More Users ...
              //...
              {
                  "id": "82e96d149a10d80f2ae18bd8",
                  "photo": "https://random.imagecdn.app/200/200",
                  "email": "user3@mail.com",
                  "password": "user3pass",
                  "role": "1"
              }        
            ]
      }
        ```
    * **Example 2:**
    * **Request:**
      * **Url:** /api/users?role=1
      * **Http Method:** GET  
    * **Response:**
      * **Status Code:** 200
      * **Json:**
        ```json
        {
          "message": "fetched 2 users",
          "response": [
              {
                  "id": "82e96d149a10d80f2ae18bd8",
                  "photo": "https://random.imagecdn.app/200/200",
                  "email": "user3@mail.com",
                  "password": "user3pass",
                  "role": "1"
              },
              {
                  "id": "ec73dd681b17a7fc6c9ae679",
                  "photo": "https://random.imagecdn.app/200/200",
                  "email": "user4@mail.com",
                  "password": "user4pass",
                  "role": "1"
              }
          ]
      }
        ```
</details>

<details>
  <summary> GET/api/users/:Uid </summary>

  * **Purpose:** Read a user with a specific id
  * **Query params:** None
  * **Url params:** 
    * **Uid:** The id of the user to read
  * **Request body:** None
  * **Example:**
    * **Request:**
      * **Url:** /api/users/1935c70b7ae4fb67b8247420
      * **Http Method:** GET
    * **Response:**
      * **Status Code:** 200
      * **Json:**
        ```json
        {
            "message": "fetched user with id 1935c70b7ae4fb67b8247420",
            "response": {
                "id": "1935c70b7ae4fb67b8247420",
                "photo": "https://random.imagecdn.app/200/200",
                "email": "user1@mail.com",
                "password": "user1pass",
                "role": "0"
            }
        }
        ```
</details>


## Products endpoints:

<details>
  <summary> POST/api/products </summary>

  * **Purpose:** Create a new product
  * **Query params:** None
  * **Url params:** None
  * **Request body:** Json string containing the new product data
  * **Example:**
    * **Request:**
      * **Url:** /api/products
      * **Http Method:** POST
      * **Request body**:
        ```json
        {
        "title":"product4", //required
        "price":"300", //optional
        "stock":10, //optional
        "category":"category1", //optional
        "photo":"https://apricture" //optional
        }
        ```
    * **Response:**
      * **Status Code:** 201
      * **Json:**
        ```json
        {
            "message": "created product with id f656d7fc7eac97d48b150780",
            "response": "f656d7fc7eac97d48b150780"
        }
        ```
</details>

<details>
  <summary> PUT/api/products/:pid </summary>

  * **Purpose:** Update an existing product
  * **Query params:** None
  * **Url params:**
    * **pid:** The id of the product to update 
  * **Request body:** Json string containing the updated product data
  * **Example:**
    * **Request:**
      * **Url:** /api/products/d4bd215bffba484ac13dfbdd
      * **Http Method:** PUT
      * **Request body**:
        ```json
        {
            "title": "Samsung A53 Updated1", //required
            "category": "SmartphonesUpdated1", //optional
            "photo": "https://Updated1", //optional
            "price": "1", //optional
            "stock": 1 //optional
        }
        ```
    * **Response:**
      * **Status Code:** 200
      * **Json:**
        ```json
        {
            "message": "updated product with id d4bd215bffba484ac13dfbdd",
            "response": {
                "id": "d4bd215bffba484ac13dfbdd",
                "category": "SmartphonesUpdated1",
                "photo": "https://Updated1",
                "title": "Samsung A53 Updated1",
                "price": "1",
                "stock": 1
            }
        } 
        ```
</details>

<details>
  <summary> DELETE/api/products/:pid </summary>

  * **Purpose:** Delete an existing product
  * **Query params:** None
  * **Url params:**
    * **pid:** The id of the product to delete
  * **Request body:** None
  * **Example:**
    * **Request:**
      * **Url:** /api/products/d4bd215bffba484ac13dfbdd:
      * **Http Method:** DELETE
    * **Response:**
      * **Status Code:** 200
      * **Json:**
        ```json
        {
            "message": "product with id d4bd215bffba484ac13dfbdd was deleted",
            "response": true
        }
        ```
</details>

<details>
  <summary> GET/api/products?category </summary>

  * **Purpose:** Read all products
  * **Query params:**
    * **category:** Used to filter products by category
  * **Url params:** None
  * **Request body:** None
  * **Example 1:**
    * **Request:**
      * **Url:** /api/products
      * **Http Method:** GET
    * **Response:**
      * **Status Code:** 200
      * **Json:**
        ```json
        {
          "message": "fetched 40 products",
          "response": [
            {
                "id": "52b80920c47be774ffe4136e",
                "category": "Smartphones",
                "photo": "https://random.imagecdn.app/200/200",
                "title": "iPhone 14",
                "price": "1200",
                "stock": 10
            },
            {
                "id": "eac91d6ce93d0df4e01ef5d5",
                "category": "Smartphones",
                "photo": "https://random.imagecdn.app/200/200",
                "title": "OnePlus 9 Pro",
                "price": "900",
                "stock": 15
            }
            //More products ...
          ]
        }
        ```
  * **Example 2:**
    * **Request:**
      * **Url:** /api/products?category=Laptops
      * **Http Method:** GET
    * **Response:**
      * **Status Code:** 200
      * **Json:**
        ```json
        {
          "message": "fetched 5 products",
          "response": 
          [
            {
                "id": "116a4eb7e130255be972d30d",
                "category": "Laptops",
                "photo": "https://random.imagecdn.app/200/200",
                "title": "MacBook Pro 16",
                "price": "2400",
                "stock": 5
            },
            {
                "id": "c7d0ed6ea98517654f674cfe",
                "category": "Laptops",
                "photo": "https://random.imagecdn.app/200/200",
                "title": "Dell XPS 13",
                "price": "1500",
                "stock": 12
            }
            // More products ...            
          ]
        }
        ```
</details>
<details>
  <summary> GET/api/products/:pid </summary>

  * **Purpose:** Read a product with a specific id
  * **Query params:** None
  * **Url params:** 
    * **pid:** The id of the product to read.
  * **Request body:** None
  * **Example:**
    * **Request:**
      * **Url:** /api/products/d4bd215bffba484ac13dfbdd
      * **Http Method:** GET
    * **Response:**
      * **Status Code:** 200
      * **Json:**
        ```json
        {
          "message": "fetched product with id d4bd215bffba484ac13dfbdd ",
          "response": {
              "id": "d4bd215bffba484ac13dfbdd",
              "category": "SmartphonesUpdated5",
              "photo": "https://Updated4",
              "title": "Samsung A53 Updated5",
              "price": "5",
              "stock": 5
          }
        }
        ```
</details>

## User Description
A User is an object containing  the following fields:
```json
{
  "id": "1935c70b7ae4fb67b8247420",
  "photo": "https://random.imagecdn.app/200/200",
  "email": "user1@mail.com",
  "password": "user1pass",
  "role": "0"
}
```
### Fields Description:
* **id:** A hexadecimal, 12 bytes long number, automatically generated upon user creation.
* **email** : Is a required field and must be an email address with a .com TLD.
* **password** : Is a required field, and must be an alphanumeric string, of 3 to 30 characters length
* **photo** : An optional http or https url, if not provided upon user creation, a default value of ´https://random.imagecdn.app/200/200´ is used.
* **role**: An optional field, must be an alphanumeric string. If not provided upon creation, the default value of "0" is used.

## Product Description
A Product is an object containing  the following fields:
```json
{
    "id": "f61952421c9d7f2f3e84ca48",
    "category": "Laptops",
    "photo": "https://random.imagecdn.app/200/200",
    "title": "Lenovo ThinkPad X1",
    "price": "1600",
    "stock": 7
}
```
### Fields Description:
* **id:** A hexadecimal, 12 bytes long number, automatically generated upon creation.
* **title**: A required field, must be a string.
* **photo** : An optional http or https url, if not provided upon creation, a default value of ´https://random.imagecdn.app/200/200´ is used.
* **category**: An optional field, must be a string. If not provided upon creation, the default value of null is used.
* **stock**: An optional field, must be a positive integer. If not provided upon creation, the default value of 1 is used.
* **price**: An optional field, must be a positive integer. If not provided upon creation, the default value of 1 is used.
