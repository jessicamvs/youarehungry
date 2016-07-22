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
      console.log(e.target.email.value);
      console.log(e.target.password.value);

      $.get('/data', {email: e.target.email.value}).done(function(result) {
        console.log(result.rows);

        if (result.rows.length !== 0) {
          alert('There seems to be an account associated with that email already!');
          console.log('this should only log once');
        } else {
          console.log('does this run at all?');
          $.get('/adduser', {email: e.target.email.value, pass: e.target.password.value}).done(function() {
            $.get('/data', {email: e.target.email.value}).done(function(result) {
              console.log(result.rows);
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
