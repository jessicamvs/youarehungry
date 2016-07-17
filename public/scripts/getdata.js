
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
    console.log(data);
    getData.transformImg(data);
  });
};

getData.transformImg = function(data) {
  var newData = data.matches.map(function(ele) {
    return {
      recipeName: ele.recipeName,
      sourceDisplayName: ele.sourceDisplayName,
      smallImageUrls: ele.smallImageUrls[0].replace('=s90', '=s360'),
      id: ele.id
    };
  });
  // console.log(newData);
  viewData.printResults(newData);
};

// getData.pullImage = function(recipeId) {
//   $.getJSON({
//     url: 'http://api.yummly.com/v1/api/recipe/' + recipeId,
//   },{
//     _app_id: '3049d607',
//     _app_key: '847fa96c28cfa82d101425ab83cba017',
//   }).done(function(data) {
//     console.log(data);
//   });
// };
