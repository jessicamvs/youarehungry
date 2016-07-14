(function(module) {
  var listController = {};

  listController.index = function() {
    $('#list').show().siblings().hide();
  };

  module.listController = listController;
})(window);
