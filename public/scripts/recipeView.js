var recipeView = {};

recipeView.index = function(ctx) {
  console.log(ctx.params.id);
  $('#print-selection').show().siblings().hide();
  $('#login-signup').hide();
  recipeView.pullRecipe(ctx);
};

recipeView.pullRecipe = function(ctx) {
  $.getJSON({
    url: 'https://api.yummly.com/v1/api/recipe/' + ctx.params.id,
  },{
    _app_id: '3049d607',
    _app_key: '847fa96c28cfa82d101425ab83cba017',
  }).done(function(data) {
    console.log(data);
    recipeView.initSelectionPage(data);
    recipeView.buttonFunction(data);
  });
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
    populateList(array[i]);
    query += '(' + id + ', \'' + array[i] + '\'), ';
  }
  var newQuery = query.slice(0, -2);
  console.log(newQuery);
  listController.addIngredients(newQuery);
};
