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

  listController.deleteIngredients = function(item) {
    $.get('/delete', {ingredient: item}).done(function(result) {
      console.log('deleteIngredients fired');
    });
  };


  module.listController = listController;
})(window);
