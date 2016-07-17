(function(module) {
  var homeController = {};

  homeController.index = function() {
    $('#home').show().siblings().hide();
    $('#login-signup').hide();

    // pg.connect(process.env.DATABASE_URL, function(err, client) {
    //   if (err) throw err;
    //   console.log('Connected to postgres! Getting schemas...');
    //
    //   client
    //     .query('SELECT * FROM users;')
    //     .on('row', function(row) {
    //       console.log(JSON.stringify(row));
    //     });
    // });

  };

  homeController.fetchAll = function(){
    $.getJSON('/data', function (result) {
      console.log('Scott was here');
      console.log(results);
      console.log(results.row);

      // result.rows.forEach(function(item) {
      //   if (item.list){
      //     console.log('if state');
      //     item.list = JSON.parse(item.list);
      //   }
      //   console.log('else');
      // });
    });
  };
  homeController.fetchAll();

  module.homeController = homeController;
})(window);
