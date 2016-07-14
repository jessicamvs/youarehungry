(function(module) {
  var myRecipesController = {};

  myRecipesController.index = function() {
    $('#myRecipes').show().siblings().hide();
  };

  module.myRecipesController = myRecipesController;
})(window);
