(function(module) {
  var signupController = {};

  signupController.index = function() {
    $('#signup').show().siblings().hide();
    $('.css-home-login-link').hide();
    $('#mainNav').hide();
    signupController.addUser();
  };

  signupController.addUser = function() {
    $('#sign-up-page').on('submit', function(e) {
      e.preventDefault();

      $.get('/data', {email: e.target.email.value}).done(function(result) {

        if (result.rows.length !== 0) {
          alert('There seems to be an account associated with that email already!');
        } else {
          $.get('/adduser', {email: e.target.email.value, pass: e.target.password.value}).done(function() {
            $.get('/data', {email: e.target.email.value}).done(function(result) {
              var currentUser = {
                id: result.rows[0].id,
                email: result.rows[0].email
              };
              localStorage.setItem('userData', JSON.stringify(currentUser));
              page('/search');
            });
          });
        }
      });

    });
  };

  module.signupController = signupController;
})(window);
