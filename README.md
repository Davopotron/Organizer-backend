# Organizer-Backend

<img width="477" alt="image" src="https://github.com/user-attachments/assets/a8cf830e-476b-443f-ba7e-968bc81ce7a3">

## Overview:

Organize and tackle your todo's in life with Organizer, which will show you where all your needs are for your convenience! This app will find the location of where your organized listed items are, so you can plan out exactly where to go to accomplish your todo's efficiently.


# Organizer

## Organizer-Backend
1. Create a new Postgres database named organizer
2. Initialize Prisma and connect it to the database
3. Define the models according to the schema above
4. The username of a User must be unique
5. Seed the database with MyList
   
## Logged in users should be able to:
- Create a new list
- Add items to a list
- Delete a list
- Search for near by stores that has the products from a specific list
- See the price for the product-oriented list items from an individual list (stretch goal)
  
## Authentication Routes
- POST /register: creates a new User with the provided credentials and sends a token
   - Request body should include username and password
   - The password should be hashed in the database
- POST /login - sends a token if the provided credentials are valid
   - Request body should include username and password

## List Routes
- GET /myLists
- PUT /myLists/:id
- DELETE /myLists/:id
- GET /myLists/:id
- POST /myLists

## List Items Routes
- DELETE /listItems/:id
- PUT /listItems/:id
- GET /listItems/:id
- POST /listItems
- GET /listItems


## Technical Challenges:
- Third party integration/acquiring and implementing a map API
- Store(s) rendering on "Near Me" map feature, based on list items
- Real-time updating
