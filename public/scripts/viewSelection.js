var viewSelection = {};

viewSelection.index = function(ctx) {
  console.log(ctx.params.id);
  $('#print-selection').show().siblings().hide();
  $('#login-signup').hide();
  viewSelection.pullRecipe(ctx);
};

viewSelection.pullRecipe = function(ctx) {
  $.getJSON({
    url: 'https://api.yummly.com/v1/api/recipe/' + ctx.params.id,
  },{
    _app_id: '3049d607',
    _app_key: '847fa96c28cfa82d101425ab83cba017',
  }).done(function(data) {
    console.log(data);
    viewSelection.initSelectionPage(data);
    viewSelection.buttonFunction(data);
  });
};

var render2 = Handlebars.compile($('#recipe-selection').html());

viewSelection.initSelectionPage = function(data) {
  $('#print-selection').empty();
  $('#print-selection').append(render2(data));
  $('#splash-image').attr('src', data.images[0].hostedLargeUrl);
  viewSelection.ingredientsList(data);
};

viewSelection.ingredientsList = function(data) {
  console.log('data', data);
  var list = data.ingredientLines;
  console.log('list', list);
  for (var i = 0; i < list.length; i++) {
    var newLi = document.createElement('li');
    newLi.textContent = list[i];
    // console.log(newUl);
    $('#ingredients-list').append(newLi);
  }
};

viewSelection.buttonFunction = function(data) {
  var ingredientArray = data.ingredientLines;
  // console.log('array', ingredientArray);
  $('#ingredients-button').on('click', function(e) {
    e.preventDefault();
    console.log('buttonFunction button clicked');
    viewSelection.syncUp(ingredientArray);
    $('#ingredients-button').text('Ingredients were added to Shopping List').unbind('click');
  });
};

viewSelection.syncUp = function(array) {
  console.log(array);
  var id = JSON.parse(localStorage.getItem('userData')).id;
  var query = 'INSERT INTO ingredients (userid, ingredient) VALUES ';
  for (var i = 0; i < array.length; i++) {
    populateList(array[i]);
    // listController.addIngredients(id, ingredientArray[i]);
    query += '(' + id + ', \'' + array[i] + '\'), ';
  }
  // console.log('slicepoint', slicePoint);
  var newQuery = query.slice(0, -2);
};
