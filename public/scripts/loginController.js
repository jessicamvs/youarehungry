(function(module) {
  var loginController = {};

  loginController.index = function() {
    $('#login-page').show().siblings().hide().parent().parent().siblings().hide();
  };

  module.loginController = loginController;
})(window);
