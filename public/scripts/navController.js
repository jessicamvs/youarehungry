$(document).ready(function() {
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
    window.location.replace('/');
  });
});
