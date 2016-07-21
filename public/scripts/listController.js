(function(module) {
  var listController = {};

  listController.index = function() {
    $('#list').show().siblings().hide();
    $('#login-signup').hide();
    listController.getId();
  };

  // loginController.listView = function(ingredientsArray) {
  //   console.log('in list view');
  //   ingredientsArray.forEach(function(ele) {
  //     console.log('in listView for loop');
  //     console.log(ele);
  //     var listItem = createNewItemElement(ele);
  //     toGetHolder.appendChild(listItem);
  //     bindItemEvents(listItem, itemBought);
  //   });
  // };
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


      // var pulledIngredients = JSON.stringify(usersIngredients);
      // var localIngredients = localStorage.getItem('list');


      // if (pulledIngredients === localIngredients) {
      //   console.log('Database matches localStorage');
      //   populateFromDatabase(JSON.parse(localIngredients));
      // } else {
      //   console.log('no local storage detected');
      //   localStorage.setItem('list', JSON.stringify(usersIngredients));
      //   populateFromDatabase(usersIngredients);
      // }
    });
  };

  listController.clearIngredients = function() {
    console.log('clearing ingredients!');
    $('#to-get').empty();
    $('#bought').empty();
  };

  listController.deleteIngredients = function(item) {
    $.get('/deleteFromList', {ingredient: item}).done(function(result) {
      console.log('deleteFromList fired');
    });
  };

  listController.addIngredients = function(id, item) {
    $.get('/addToList', {userid: id, ingredient: item}).done(function(result) {
      console.log('addToList fired');
    });
  };


  module.listController = listController;
})(window);
