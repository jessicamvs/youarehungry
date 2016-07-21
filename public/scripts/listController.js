(function(module) {
  var listController = {};

  listController.index = function() {
    $('#mainNav').show();
    $('#list').show().siblings().hide();
    listController.getId();
  };

  listController.desperateAardvark = function(queryString) {
    pg.defaults.ssl = true;
    pg.connect(process.env.DATABASE_URL, function(err, client) {
      if (err) throw err;
      console.log('Connected to postgres! Getting schemas...');

      client
        .query(queryString)
        .on('row', function(row) {
          console.log(JSON.stringify(row));
        });
    });
  };

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

  listController.addIngredients = function(string) {
    var query = {values: string};
    console.log('new query obj', query);
    $.get('/addToList', query).done(function() {
      console.log('addToList fired');
    });
  };

  module.listController = listController;
})(window);
