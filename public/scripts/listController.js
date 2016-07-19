(function(module) {
  var listController = {};

  listController.index = function() {
    $('#list').show().siblings().hide();
    $('#login-signup').hide();
  };
  
  module.listController = listController;
})(window);
