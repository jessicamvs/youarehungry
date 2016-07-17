(function(module) {
  var homeController = {};

  homeController.index = function() {
    $('#home').show().siblings().hide();
    $('#login-signup').hide();
  };

  homeController.fetchAll = function(){
    $.getJSON('/data', function (result) {
      console.log('Scott was here');
      // console.log(result);
      // console.log(result.row);

      result.rows.forEach(function(item) {
        console.log(item);
      //   if (item.list){
      //     console.log('if state');
      //     item.list = JSON.parse(item.list);
      //   }
      //   console.log('else');
      });
    });
  };
  homeController.fetchAll();

  module.homeController = homeController;
})(window);
