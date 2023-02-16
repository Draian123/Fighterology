# WUNDERLIST
<br>

## Description
Organize your life in a wonderful way.
<br>

## User stories
- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to see the home page and be able either login or sign up.
- **login** - As a user I want to see the login page where I can login
- **signup** - As a user I want to see the sign up page where I can sign up and then login
- **profile** - As a user I want to see the profile page after logging in with all my lists
- **list** - As a user I want to see the list I chose on my profile page with products I need and/or have
- **navbar** - As a user I want to see different menu options whenever I'm logged in or logged out

<br>

## API routes (back-end)

- GET / 
  - renders index.ejs

- POST /addProduct/:id
  - crated the product and adds it to the current user's current shopping list (need)

- POST /moveNeedToHave/:id
  - moves the product from need list to have list and the redirects to the same list

- POST /moveHaveToNeed/:id
  - moves the product from have list to need list and the redirects to the same list

- POST /delete/product/:listId
  - deletes the product from have list and the redirects to the same list

- GET /logout
  - ends the session and renders index page

- GET /auth/signUp
  - if the user is not logged in, it renders the sign up page

- POST /auth/signUp
  - checks if the user exists and if the password is the same as the repeat password
  - redirects to the login page if everything is correct
  - body: name, password, repeat password

- GET /auth/login
  - if the user is not logged in, it renders the login page

- POST /auth/login
  - if the username and the password are correct it redirects to the profile page, otherwise redirects to the login page
  - body: name, password

- GET /auth/profile
  - renders profile page when logged in

- POST /auth/profile/delete/:id
  - deletes the list with the related id

- GET /auth/profile/:id
  - renders the current user's profile

- POST /profile/createNewList
  - creates a new shopping list and redirects to the profile page

- GET /profile/list/:id
  - it renders the user's chosen list

<br>

## Models
 
 - Product
    new Schema(
  {
    name: {
      type: String,
      required: true,
    }
  }
);
          
  - ShoppingList
    new Schema(
  {
    name: {
      type: String,
      required: true,
      // unique: true,
    },
    userId:{
      type: String,
      required: true
    },
    need: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    have: [{
      type: Schema.Types.ObjectId,
      ref: 'Product'
  }],
  }
);
    
  - User
		new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  shoppingLists: [{
    type: Schema.Types.ObjectId,
    ref: 'ShoppingList'
}]
});
    
    <br>
    
## Backlog
    
 - Profile page
    - Add background image

 - List page
    - Add background image
    
<br>

## Links
https://trello.com/b/KTaTH6eQ/project-with-istvan


### Git
https://github.com/Draian123/WUNDERLIST

https://wunderlist.adaptable.app/

<br>

### Slides
https://slides.com/ispetrov/wunderlist/edit
