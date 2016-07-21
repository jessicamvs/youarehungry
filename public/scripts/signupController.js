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
      $.get('/adduser', {email: e.target.email.value, pass: e.target.password.value});
      window.location.replace('/search');
    });
  };

  module.signupController = signupController;
})(window);
