(function(module) {
  var recipeController = {};

  recipeController.index = function() {
    $('#recipe').show().siblings().hide();
  };

  module.recipeController = recipeController;
})(window);
