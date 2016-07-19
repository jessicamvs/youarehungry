$(document).ready(function() {
  $('body').addClass('js');

  var $menu = $('.icon-spoon-knife'),
    $menulink = $('.menu-link'),
    $wrap = $('#wrap');

  $menu.on('click', function() {
    $menulink.toggleClass('active');
    $wrap.toggleClass('active');
  });

  $('#menu').on('click', 'li', function() {
    $menulink.toggleClass('active');
    $wrap.toggleClass('active');
  });
});
