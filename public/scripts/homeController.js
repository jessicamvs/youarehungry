(function(module) {
  var homeController = {};

  homeController.index = function() {
    $('#home').show().siblings().hide();
    $('#login-signup').hide();
    $('#mainNav').hide();
    $('.css-home-login-link').show();
  };

  module.homeController = homeController;
})(window);
