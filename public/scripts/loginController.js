(function(module) {
  var loginController = {};

  loginController.index = function() {
    $('#login-page').show().siblings().hide();
    $('#pattern').hide();
    loginController.verifyuser();
  };

  loginController.verifyuser = function() {

    $('#login-page').on('submit', function(e) {

      e.preventDefault();
      $.get('/data', {email: e.target.email.value}).done(function(result) {
        console.log(result.rows);

        if (result.rows.length === 0) {
          alert('database says you do not exist');
        } else {
          console.log('This user is in the DB');
          var currentUser = {
            id: result.rows[0].id,
            email: result.rows[0].email
          };
          localStorage.setItem('userData', JSON.stringify(currentUser));
          loginController.fetchIngredients(currentUser.id);
          window.location.replace('/search');
        }
      });
    });
  };

  loginController.fetchIngredients = function(id) {
    console.log('FETCHING INGREDIENTS NOW');
    $.get('/ingredients', {userid: id}).done(function(result) {
      console.log(result.rows);

      var usersIngredients = [];

      result.rows.forEach(function(item) {
        console.log(item.ingredient);
        usersIngredients.push(item.ingredient);
      });

      console.log(usersIngredients);
      localStorage.setItem('list', JSON.stringify(usersIngredients));
    });
  };

  module.loginController = loginController;
})(window);
