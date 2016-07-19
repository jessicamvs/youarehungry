(function(module) {
  var listController = {};

  listController.index = function() {
    $('#list').show().siblings().hide();
    $('#login-signup').hide();
  };

  homeController.dbTest = function(){
    $.getJSON('/ingredients', function (result) {
      result.rows.forEach(function(item) {
        console.log(item);
      });
    });
  };

  listController.dbTest();
  module.listController = listController;
})(window);
