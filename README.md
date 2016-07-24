# Prep for Presentation (delete before final)
Patrick:
1. introduce group, problem statement and mvp goals
2. will not list everything in MVP. just choose 5 or 6 items.
3. handlebars templates and  
4. most difficult: wrapping my brain around how to incorporate SQL queries with our functions
5. most proud of: getting login data to store in database

Jessica
1. most difficult for me:
2. most proud of:

Nassir
1. most difficult for me:
2. most proud of:

Lillian
1. most difficult for me:
2. most proud of:

# You Are Hungry
A recipe search and shopping list app for Code Fellows 301n3 final project. Final app found here: [You Are Hungry!](https://youarehungry.herokuapp.com/ "You Are Hungry!").

## Problem Statement and MVP
User wants to search for a recipe, and save ingredients to a list for shopping.

## MVP & Basic Functionality
+ Search recipes by keyword
+ User wants to see top rated recipes
+ Search results includes:
  + Title of recipe
  + Image
  + List of ingredients
  + Link to recipe/source
  + Button that adds all ingredients to shopping list

+ List & Data Management
  + Data persists between visits in localStorage
  + User’s shopping list stored in DB
  + Update page (but not DB) when items are deleted from list
  + User can check off list items as they are found in store, delete individual items or entire list.
  + User can manually add items to the list **adds to db too??**

## High Level Components/Functionality

### Handlebars for:
  + search-results
  + recipe-selection
  <!-- + viewData.js -->

### Server.js
  + Postres

  ``` javascript
  app.get('/adduser', function (req, res) {
    console.log(req.query);
    var data = {email: req.query.email, pass: req.query.pass};
    console.log(data.email);
    console.log(data.pass);

    var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/skinbiology';

    var client = new pg.Client(connectionString);
    client.connect(function(err) {
      if(err) {
        return console.error('could not connect to postgres');
      }

      client.query('INSERT INTO users (email, password) VALUES ($1, $2)', [data.email, data.pass], function(err, result) {
        if(err) {
          return console.error('error running query', err);
        }
        res.send(result);
        client.end();
      });
    });
  });
  ```

### How we get data from an API
``` javascript
var getData = {};

getData.runSearch = function(searchPhrase) {
  $.getJSON('https://api.yummly.com/v1/api/recipes', {
    _app_id: '3049d607',
    _app_key: '847fa96c28cfa82d101425ab83cba017',
    requirePictures: true,
    q: searchPhrase
  }).done(function(data) {
    console.log(data);
    getData.transformImg(data);
  });
};
```
### Controllers
  + homeController
  + listController
  + loginController
  + navController
  + searchController
  + signupController

  **A snippet from listController**
  ``` javascript
  listController.getId = function() {
    var id = JSON.parse(localStorage.getItem('userData')).id;
    console.log('list controller', id);
    listController.clearIngredients();
    listController.fetchIngredients(id);
  };

  listController.fetchIngredients = function(id) {
    console.log('FETCHING INGREDIENTS NOW');
    var usersIngredients = [];
    $.get('/ingredients', {userid: id}).done(function(result) {
      console.log(result.rows);

      result.rows.forEach(function(item) {
        console.log(item.ingredient);
        usersIngredients.push(item.ingredient);
      });

      console.log('line 39',usersIngredients);
      localStorage.setItem('list', JSON.stringify(usersIngredients));
      populateFromDatabase(usersIngredients);
    });
  };
  ```
### Individually adding/deleting items to shopping list
+ listView.js
  + creates new elements with a delete button and checkbox for each item that is added to the DOM

### Authors
-[Jessica Vasquez-Soltero](https://github.com/jessicamvs "Jessica's Github")
-[Nassir Isaf](https://github.com/njisaf "Nassir's Github")
-[Patrick Colgan](https://github.com/patrickjcolgan "Patrick's Github")
-[Lillian Szugyi](https://github.com/lillianszugyi "Lillian's Github")
