(function(module) {
  var myRecipesController = {};

  myRecipesController.index = function() {
    $('#myRecipes').show().siblings().hide();
    $('#login-signup').hide();
  };

  module.myRecipesController = myRecipesController;
})(window);
