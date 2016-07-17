// var viewSelection = {};
//
// viewSelection.initSelectionPage = function() {
//   var template = Handlebars.compile($('#print-selection').text());
// };

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
