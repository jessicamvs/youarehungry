(function(module) {
  var signupController = {};

  signupController.index = function() {
    $('#sign-up-page').show().siblings().hide();
  };

  module.signupController = signupController;
})(window);
