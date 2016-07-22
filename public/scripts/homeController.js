(function(module) {
  var homeController = {};

  homeController.index = function() {
    $('#home').show().siblings().hide();
    $('#login-signup').hide();
    $('#mainNav').hide();
    $('.css-home-login-link').show();
    homeController.readyPage();
  };


  homeController.readyPage = function(){
    $('body').addClass('js');

    $('#mainNav').on('click', 'a', function() {
      $('.menu-link').toggleClass('active');
      $('#wrap').toggleClass('active');
    });

    $('#logout-nav-button').on('click', function(e) {
      e.preventDefault();
      localStorage.removeItem('list');
      localStorage.removeItem('userData');
      console.log('localStorage userData & list removed');
      page('/');
    });
  };

  // $(document).ready(function() {
  //   $('body').addClass('js');
  //
  //   $('#mainNav').on('click', 'a', function() {
  //     $('.menu-link').toggleClass('active');
  //     $('#wrap').toggleClass('active');
  //   });
  //
  //   $('#logout-nav-button').on('click', function(e) {
  //     e.preventDefault();
  //     localStorage.removeItem('list');
  //     localStorage.removeItem('userData');
  //     console.log('localStorage userData & list removed');
  //     page('/');
  //   });
  //
  // });

  module.homeController = homeController;
})(window);
