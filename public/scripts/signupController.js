(function(module) {
  var signupController = {};

  signupController.index = function() {
    $('#sign-up-page').show().siblings().hide().parent().parent().siblings().hide();
  };

  signupController.addUser = function(){
    $('#sign-up-page').on('submit', function(e) {
      e.preventDefault();
      console.log(e.target.email.value);
      console.log(e.target.password.value);
      $.get('/adduser', {email: e.target.email.value, pass: e.target.password.value}).done(function(result) {
        var currentUser = {
          id: result.rows[0].id,
          email: result.rows[0].email
        };
        localStorage.setItem('userData', JSON.stringify(currentUser));
        loginController.fetchIngredients(currentUser.id);
        window.location.replace('/');
      });
    });
  };

  signupController.addUser();

  module.signupController = signupController;
})(window);
