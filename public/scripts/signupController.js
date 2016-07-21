(function(module) {
  var signupController = {};

  signupController.index = function() {

    $('#sign-up-page').show().siblings().hide();
    $('#pattern').hide();
    signupController.addUser();
  };

  signupController.addUser = function(){
    $('#sign-up-page').on('submit', function(e) {
      e.preventDefault();
      console.log(e.target.email.value);
      console.log(e.target.password.value);
      $.get('/adduser', {email: e.target.email.value, pass: e.target.password.value}).done(function(result) {
        var currentUser = {
          email: result.rows[0].email,
          email: result.rows[0].email
        };
        localStorage.setItem('userData', JSON.stringify(currentUser));
        loginController.fetchIngredients(currentUser.id);
        window.location.replace('/');
      });
    });
  };

  module.signupController = signupController;
})(window);
