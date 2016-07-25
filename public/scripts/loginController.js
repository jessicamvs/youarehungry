(function(module) {
  var loginController = {};

  loginController.index = function() {
    $('#login').show().siblings().hide();
    $('.css-home-login-link').hide();
    $('#mainNav').hide();
    loginController.verifyuser();
  };

  loginController.verifyuser = function() {

    $('#login-page').on('submit', function(e) {

      e.preventDefault();
      $.get('/data', {email: e.target.email.value}).done(function(result) {

        if (result.rows.length === 0) {
          alert('database says you do not exist');
        } else {
          if (result.rows[0].password === e.target.password.value) {
            var currentUser = {
              id: result.rows[0].id,
              email: result.rows[0].email
            };
            localStorage.setItem('userData', JSON.stringify(currentUser));
            page('/search');
          } else {
            alert('Email and password do not match');
          }
        }
      });
    });
  };

  module.loginController = loginController;
})(window);
