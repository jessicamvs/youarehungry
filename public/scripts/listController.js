(function(module) {
  var listController = {};

  listController.index = function() {
    $('#list').show().siblings().hide();
    $('#login-signup').hide();
    listController.dbTest();
  };

  listController.dbTest = function(){
    console.log('listController firing');
    $.getJSON('/ingredients', function (result) {
      result.rows.forEach(function(item) {
        console.log(item);
      });
    });
  };

  module.listController = listController;
})(window);
