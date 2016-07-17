(function(module) {
  var signupController = {};

  signupController.index = function() {
    $('#sign-up-page').show().siblings().hide().parent().parent().siblings().hide();
  };

  signupController.addUser = function(){
    $('#sign-up-page').on('submit', function(e) {
      e.preventDefault();
      console.log(e.target.Name.value);
      console.log(e.target.Email.value);
      console.log(e.target.password.value);
      $.post('/adduser', {name: e.target.Name.value, pass: e.target.password.value});
    });
  };

  signupController.addUser();

  module.signupController = signupController;
})(window);
