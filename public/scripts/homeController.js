(function(module) {
  var homeController = {};

  homeController.index = function() {
    $('#home').show().siblings().hide();
    $('#login-signup').hide();
    $('#mainNav').hide();
  };

  module.homeController = homeController;
})(window);
