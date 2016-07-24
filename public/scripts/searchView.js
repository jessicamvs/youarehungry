(function(module) {

  var searchView = {};

  $('#searchBox').on('submit', function(e) {
    e.preventDefault();
    if(this.search.value) {
      $('#print-results').children().remove();
      var searchTerms = this.search.value;
      searchController.runSearch(searchTerms);
    };
  });

  var render = Handlebars.compile($('#search-results').html());

  searchView.printResults = function(data) {
    data.forEach(function(ele) {
      $('#print-results').append(render(ele));
    });
  };

  module.searchView = searchView;
})(window);
