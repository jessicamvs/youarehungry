
// var allowedIngredient = "allowedIngredient[]";
// var excludedIngredient = "excludedIngredient[]";
// var excludedCuisine = "excludedCuisine[]";

var getData = {};

getData.runSearch = function(searchPhrase) {
  $.getJSON('http://api.yummly.com/v1/api/recipes', {
    _app_id: '3049d607',
    _app_key: '847fa96c28cfa82d101425ab83cba017',
    requirePictures: true,
    q: searchPhrase
  }).done(function(data) {
    viewData.printResults(data);
  });
};
