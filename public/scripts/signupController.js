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
      $.get('/adduser', {email: e.target.email.value, pass: e.target.password.value});
      // .done(function(result) {
        // var currentUser = {
        //   email: result.rows[0].email,
        //   password: result.rows[0].password
        // };
        // localStorage.setItem('userData', JSON.stringify(currentUser));
        // window.location.replace('/');
      // });
      page('/search');
    });
  };

  module.signupController = signupController;
})(window);
