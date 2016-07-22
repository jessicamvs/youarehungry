(function(module) {
  var searchController = {};

  searchController.index = function() {
    $('#mainNav').show();
    $('#search').show().siblings().hide();
    $('.css-home-login-link').hide();
  };

  module.searchController = searchController;
})(window);
