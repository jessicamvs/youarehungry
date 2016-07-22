(function(module) {
  var searchController = {};

  searchController.index = function() {
    $('#mainNav').show();
    $('#search').show().siblings().hide();
    $('.css-home-login-link').hide();
  };

  searchController.runSearch = function(searchPhrase) {
    $.getJSON('https://api.yummly.com/v1/api/recipes', {
      _app_id: '3049d607',
      _app_key: '847fa96c28cfa82d101425ab83cba017',
      requirePictures: true,
      q: searchPhrase
    }).done(function(data) {
      console.log(data);
      searchController.transformImg(data);
    });
  };

  searchController.pullRecipe = function(ctx) {
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

  searchController.transformImg = function(data) {
    var newData = data.matches.map(function(ele) {
      return {
        recipeName: ele.recipeName,
        sourceDisplayName: ele.sourceDisplayName,
        smallImageUrls: ele.smallImageUrls[0].replace('=s90', '=s360'),
        id: ele.id
      };
    });
    searchView.printResults(newData);
  };

  module.searchController = searchController;
})(window);
