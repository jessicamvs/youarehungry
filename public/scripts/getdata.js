
// var allowedIngredient = "allowedIngredient[]";
// var excludedIngredient = "excludedIngredient[]";
// var excludedCuisine = "excludedCuisine[]";


var runSearch = function(recipe) {
  var recipeSearch = "q";
  var searchObject = {
    _app_id: "3049d607",
    _app_key: "847fa96c28cfa82d101425ab83cba017",
  };
  searchObject[recipeSearch] = recipe;
  pullData(searchObject);
}

var pullData = function(searchObject) {
    $.getJSON('http://api.yummly.com/v1/api/recipes', searchObject).done(function(data) {
      data.matches.forEach(function(ele) {
        console.log(ele);
      })
      });
}