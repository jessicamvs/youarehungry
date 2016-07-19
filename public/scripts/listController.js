(function(module) {
  var listController = {};

  listController.index = function() {
    $('#list').show().siblings().hide();
    $('#login-signup').hide();
    listController.dbTest();
  };

  listController.desperateAardvark = function(queryString) {
    pg.defaults.ssl = true;
    pg.connect(process.env.DATABASE_URL, function(err, client) {
      if (err) throw err;
      console.log('Connected to postgres! Getting schemas...');

      client
        .query(queryString)
        .on('row', function(row) {
          console.log(JSON.stringify(row));
        });
    });
  };

  listController.dbTest = function(){
    console.log('listController firing');
    $.getJSON('/ingredients', function (result) {
      console.log(result);
      console.log('fire test');
      result.rows.forEach(function(item) {
        console.log(item);
      });
    });
  };

  module.listController = listController;
})(window);
