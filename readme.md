# Challenge 1

## Table of contents:
  * [How to test this API]():
  * [Implemented Features](#features-implemented): A document containing the requirements for this challenge
  * [API Endpoints](#users-endpoints): A brief description of the different API endpoints implemented in this challenge.
  * [User Description](#user-description): A detailed description of the user's object fields.
  * [Product Description](#product-description): A detailed description of the product's object fields.

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
  <summary> GET/api/products?role </summary>

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
