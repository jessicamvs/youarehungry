$(document).ready(function() {
  $('body').addClass('js');

  $('#mainNav').on('click', 'a', function() {
    $('.menu-link').toggleClass('active');
    $('#wrap').toggleClass('active');
  });

  $('#logout-nav-button').on('click', function(e) {
    e.preventDefault();
    window.location.replace('/login');
    localStorage.removeItem('userData');
    console.log('localStorage userData removed');
  });

  $('#menu').on('click', 'li', function() {
    $menulink.toggleClass('active');
    $wrap.toggleClass('active');
  });
});
