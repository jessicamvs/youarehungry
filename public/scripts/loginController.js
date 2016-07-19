(function(module) {
  var loginController = {};

  // var tempUsers = [
  // //  {id: 1, email: "patrick@email.com", password: "password1"}
  // //  {id: 2, email: "jessca@email.com", password: "dfjlkdsjflkdsjflkdsjflk"}
  // ]

  loginController.index = function() {
    $('#login-page').show().siblings().hide().parent().parent().siblings().hide();
  };

  loginController.verifyuser = function() {
    $('#login-page').on('submit', function(e) {
      // e.preventDefault();
      console.log(e.target.email.value);
      console.log(e.target.password.value);
      $.getJSON('/data', {email: e.target.email.value}, function(result) {
        console.log(result);
        console.log(result.rows);
        if (result.rows.length === 0) {
          alert('database says you do not exist');
        } else {
          localStorage.setItem('userInfo', JSON.stringify(result.rows[0]));
          page('/');
        }
      });
    });
  };

  loginController.verifyuser();

  module.loginController = loginController;
})(window);
