(function(module) {
  var loginController = {};

  loginController.index = function() {
    $('#login-page').show().siblings().hide().parent().parent().siblings().hide();
  };

  loginController.fetchIngredients = function() {
    $.get('/ingredients', {userid: 1}, function(result) {
      console.log(result.rows);
      result.rows.forEach(function(item) {
        var listItem = createNewItemElement(item.ingredient);
        toGetHolder.appendChild(listItem);
        bindItemEvents(listItem, itemBought);
      });
    });
  };

  loginController.fetchIngredients();

  loginController.verifyuser = function() {
    $('#login-page').on('submit', function(e) {
      e.preventDefault();
      console.log(e.target.email.value);
      console.log(e.target.password.value);
      $.get('/data', {email: e.target.email.value}, function(result) {
        console.log(result);
        console.log(result.rows);
        if (result.rows.length === 0) {
          alert('database says you do not exist');
        } else {
          console.log('rows was not empty ELSE');
          localStorage.setItem('userData', JSON.stringify(result.rows[0]));
          page('/');
        }
      });
    });
  };



  loginController.verifyuser();

  module.loginController = loginController;
})(window);
