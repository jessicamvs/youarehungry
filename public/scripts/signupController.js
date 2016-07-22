(function(module) {
  var signupController = {};

  signupController.index = function() {
    $('#signup').show().siblings().hide();
    signupController.addUser();
  };

  signupController.addUser = function(){
    $('#sign-up-page').on('submit', function(e) {
      e.preventDefault();
      console.log(e.target.email.value);
      console.log(e.target.password.value);
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
    });
  };

  module.signupController = signupController;
})(window);
