(function(module) {
  var searchController = {};

  searchController.index = function() {
    $('#mainNav').show();
    $('#search').show().siblings().hide();
  };

  module.searchController = searchController;
})(window);
