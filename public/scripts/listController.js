(function(module) {
  var listController = {};

  listController.index = function() {
    $('#list').show().siblings().hide();
    $('#login-signup').hide();
    listController.dbTest();
  };
//Nassir's handy work
  // listController.dbTest = function(){
  //   console.log('listController firing');
  //   $.getJSON('/ingredients', function (result) {
  //     console.log(result);
  //     console.log('fire test');
  //     result.rows.forEach(function(item) {
  //       console.log(item);
  //     });
  //   });
  // };

  module.listController = listController;
})(window);
