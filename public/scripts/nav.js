$(document).ready(function() {
  $('body').addClass('js');

  $('#mainNav').on('click', 'a', function() {
    $('.menu-link').toggleClass('active');
    $('#wrap').toggleClass('active');
  });
});
