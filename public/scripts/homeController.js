(function(module) {
  var homeController = {};

  homeController.index = function() {
    $('#home').show().siblings().hide();
    $('#login-signup').hide();
  };

  // homeController.dbTest = function(){
  //   $.getJSON('/data', function (result) {
  //     result.rows.forEach(function(item) {
  //       console.log(item);
  //     });
  //   });
  // };
  // homeController.dbTest();

  module.homeController = homeController;
})(window);
