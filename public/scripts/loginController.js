(function(module) {
  var loginController = {};

  loginController.index = function() {
    $('#login').show().siblings().hide();
    $('.css-home-login-link').hide();
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
          page('/search');
        }
      });
    });
  };

  module.loginController = loginController;
})(window);
