(function(module) {
  var loginController = {};

  loginController.usersIngredients = [];

  loginController.currentUser = {id: 10, email: 'blah', ingredients: ['blue', 'pink']};

  loginController.index = function() {
    // $('#login-page').show().siblings().hide().parent().parent().siblings().hide();
    loginController.verifyuser();
  };

  loginController.fetchIngredients = function(id) {
    console.log('FETCHING INGREDIENTS NOW');
    $.get('/ingredients', {userid: id}, function(result) {
      console.log(result.rows);
      result.rows.forEach(function(item) {
        console.log(item.ingredient);
        loginController.usersIngredients.push(item.ingredient);
      });
      loginController.listView(loginController.usersIngredients);
      loginController.currentUser.ingredients = loginController.currentUser;
      console.log(loginController.currentUser);
      // localStorage.setItem('userData', JSON.stringify(loginController.currentUser));
    });
  };

  loginController.listView = function(ingredientsArray) {
    console.log('in list view');
    ingredientsArray.forEach(function(ele) {
      console.log('in listView for loop');
      console.log(ele);
      var listItem = createNewItemElement(ele);
      toGetHolder.appendChild(listItem);
      bindItemEvents(listItem, itemBought);
    });
  };

  loginController.verifyuser = function() {

    $('#login-page').on('submit', function(e) {
      e.preventDefault();
      $.get('/data', {email: e.target.email.value}).done(function(result) {
        console.log(result.rows);

        if (result.rows.length === 0) {
          alert('database says you do not exist');
        } else {
          //store userid, email, and ingredients in local storage then we can add ingredients to localStorage everytime item is added
          console.log('rows was not empty ELSE');
          loginController.fetchIngredients(result.rows[0].id);
          loginController.currentUser.id = result.rows[0].id;
          loginController.currentUser.email = result.rows[0].email;
          console.log(loginController.usersIngredients);
          // var currentUser = {
            // ingredients: loginController.usersIngredients //not working. It is empty when it gets here.
          // };

          console.log('current user', loginController.currentUser);

          // localStorage.setItem('userData', JSON.stringify(currentUser));
          // window.location.replace('/');
        }
      });
    });
  };

  // loginController.verifyuser = function() {
  //
  //   $('#login-page').on('submit', function(e) {
  //     e.preventDefault();
  //     $.get('/data', {email: e.target.email.value}, function(result) {
  //       console.log(result.rows);
  //
  //       if (result.rows.length === 0) {
  //         alert('database says you do not exist');
  //       } else {
  //         //store userid, email, and ingredients in local storage then we can add ingredients to localStorage everytime item is added
  //         console.log('rows was not empty ELSE');
  //         loginController.fetchIngredients(result.rows[0].id);
  //         loginController.listView(loginController.usersIngredients);
  //         var currentUser = {
  //           id: result.rows[0].id,
  //           email: result.rows[0].email,
  //           ingredients: loginController.usersIngredients //not working. It is empty when it gets here.
  //         };
  //
  //         console.log(currentUser);
  //
  //         localStorage.setItem('userData', JSON.stringify(currentUser));
  //         // window.location.replace('/');
  //       }
  //     });
  //   });
  //
  // };

  module.loginController = loginController;
})(window);
