$(document).ready(function() {
  $('body').addClass('js');

  var $menu = $('#menu'),
    $menulink = $('.menu-link'),
    $wrap = $('#wrap');

  $menu.on('click', function() {
    $menulink.toggleClass('active');
    $wrap.toggleClass('active');
    return false;
  });
});
