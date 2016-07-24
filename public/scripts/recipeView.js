var recipeView = {};

recipeView.index = function(ctx) {
  console.log(ctx.params.id);
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
  console.log('data', data);
  var list = data.ingredientLines;
  console.log('list', list);
  for (var i = 0; i < list.length; i++) {
    var newLi = document.createElement('li');
    newLi.textContent = list[i];
    $('#ingredients-list').append(newLi);
  }
};

recipeView.buttonFunction = function(data) {
  var ingredientArray = data.ingredientLines;
  $('#ingredients-button').on('click', function(e) {
    e.preventDefault();
    console.log('buttonFunction button clicked');
    recipeView.syncUp(ingredientArray);
    $('#ingredients-button').text('Ingredients were added to Shopping List').unbind('click');
  });
};

recipeView.syncUp = function(array) {
  console.log('syncup', array);
  var id = JSON.parse(localStorage.getItem('userData')).id;
  var query = '';
  for (var i = 0; i < array.length; i++) {
    listView.populateList(array[i]);
    query += '(' + id + ', \'' + array[i] + '\'), ';
  }
  var newQuery = query.slice(0, -2);
  console.log('newQuery:', newQuery);
  var newNewQuery = newQuery.replace("'s", "''s");
  console.log('newNewQuery', newNewQuery);
  listController.addIngredients(newNewQuery);
};
