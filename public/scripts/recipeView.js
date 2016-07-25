(function(module) {

  var recipeView = {};

  recipeView.index = function(ctx) {
    $('#print-selection').show().siblings().hide();
    $('#login-signup').hide();
    searchController.pullRecipe(ctx);
  };

  var render2 = Handlebars.compile($('#recipe-selection').html());

  recipeView.initSelectionPage = function(data) {
    $('#print-selection').empty();
    $('#print-selection').append(render2(data));
    $('#splash-image').attr('src', data.images[0].hostedLargeUrl);
    recipeView.ingredientsList(data);
  };

  recipeView.ingredientsList = function(data) {
    var list = data.ingredientLines;
    list.forEach(function(ele) {
      var newLi = document.createElement('li');
      newLi.textContent = ele;
      $('#ingredients-list').append(newLi);
    });
  };

  recipeView.buttonFunction = function(data) {
    var ingredientArray = data.ingredientLines;
    $('#ingredients-button').on('click', function(e) {
      e.preventDefault();
      recipeView.syncUp(ingredientArray);
      $('#ingredients-button').text('Ingredients were added to Shopping List').unbind('click');
    });
  };

  recipeView.syncUp = function(array) {
    var id = JSON.parse(localStorage.getItem('userData')).id;
    var query = '';
    array.forEach(function(ele) {
      listView.populateList(ele);
      query += '(' + id + ', \'' + ele + '\'), ';
    });

    var newQuery = query.slice(0, -2);
    var newNewQuery = newQuery.replace("'s", "''s");
    listController.addIngredients(newNewQuery);
  };
  module.recipeView = recipeView;
})(window);
