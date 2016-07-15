(function(module) {
  var searchController = {};

  searchController.index = function() {
    $('#search').show().siblings().hide();
    $('#login-signup').hide();
  };

  module.searchController = searchController;
})(window);
