(function(module) {
  var listController = {};

  listController.index = function() {
    $('#mainNav').show();
    $('#list').show().siblings().hide();
    $('.css-home-login-link').hide();
    listController.getId();
  };

  listController.getId = function() {
    var id = JSON.parse(localStorage.getItem('userData')).id;
    listController.clearIngredients();
    listController.fetchIngredients(id);
  };

  listController.clearIngredients = function() {
    $('#to-get').empty();
    $('#bought').empty();
  };

  listController.fetchIngredients = function(id) {
    var usersIngredients = [];
    $.get('/ingredients', {userid: id}).done(function(result) {

      result.rows.forEach(function(item) {
        usersIngredients.push(item.ingredient);
      });

      localStorage.setItem('list', JSON.stringify(usersIngredients));
      listView.populateFromDatabase(usersIngredients);
    });
  };

  listController.deleteIngredients = function(item) {
    $.get('/deleteFromList', {ingredient: item});
  };

  listController.deleteAllIngredients = function(item) {
    $.get('/deleteAllFromList', {id: item});
  };

  listController.addIngredients = function(string) {
    var newQuery = string.replace("'s", "''s");
    var query = {values: newQuery};
    $.get('/addToList', query).;
  };

  module.listController = listController;
})(window);
