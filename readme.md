# Challange 1

## Requirements implemented:

As required in the [this document](https://docs.google.com/presentation/d/1BVsH1ABIKOjct2PNRRzTXxCRApwMA7JAr9NZsXuCTsE/edit#slide=id.g120b44b0dae_0_1259), the following endpoints were implementd :

## Users endpoints:
<details>
  <summary>POST/api/users </summary>
  
  * **Purpouse:** Create a new user  
  * **Query params:** None
  * **Url params:** None
  * **Request body:** Json string containing the user data
  * **Example:**
    * **Request:**
      * **Url:** /api/users
      * **Htpp Method:** POST
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
  
  * **Purpouse:** Update an existing user  
  * **Query params:** 
    * **Uid:** The id of the user to be updated
  * **Url params:** None
  * **Request body:** Json string containing the user data
  * **Example:**
    * **Request:**
      * **Url:** /api/users/1935c70b7ae4fb67b8247420
      * **Htpp Method:** PUT
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

  * **Purpouse:** Delete a user
  * **Query params:** 
  * **Uid:** The id of the user to delete
  * **Url params:** None
  * **Request body:** None
  * **Example:**
    * **Request:**
      * **Url:** /api/users/1935c70b7ae4fb67b8247420
      * **Htpp Method:** DELETE
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
  <summary> GET/api/produtcs?role </summary>

  * **Purpouse:** Read users
  * **Query params:** 
    * **role:** Used to filter users by role
  * **Url params:** None
  * **Request body:** None
  * **Example 1:**
    * **Request:**
      * **Url:** /api/users
      * **Htpp Method:** GET  
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
      * **Htpp Method:** GET  
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

  * **Purpouse:** Read a user with a spcific id
  * **Query params:** None
  * **Url params:** 
    * **Uid:** The id of the user to read
  * **Request body:** None
  * **Example:**
    * **Request:**
      * **Url:** /api/users/1935c70b7ae4fb67b8247420
      * **Htpp Method:** GET
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




