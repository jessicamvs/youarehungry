(function(module) {
  var loginController = {};

  var tempUsers = [
   {id: 1, username: "nassir", password: "password"},
   {id: 2, username: "notnassir", password: "P_assword123"},
   {id: 3, username: "lilz", password: "passpass"},
   {id: 4, username: "cups", password: "cups"},
   {id: 5, username: "dan", password: "dan"},
   {id: 6, username: "TestLillian", password: "TestLillian"}
  ]

  loginController.index = function() {
    $('#login-page').show().siblings().hide().parent().parent().siblings().hide();
  };

  loginController.verifyuser = function() {
    $('#login-page').on('submit', function(e) {
      e.preventDefault();
      console.log(e.target.email.value);
      console.log(e.target.password.value);
      if ()
    })
  }
  loginController.verifyuser();

  module.loginController = loginController;
})(window);
