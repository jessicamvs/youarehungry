var viewData = {};

$('#searchBox').on('submit', function(e) {
  e.preventDefault();
  if(this.search.value) {
    $('#print-results').children().remove();
    var searchTerms = this.search.value;
    getData.runSearch(searchTerms);
  };
});

var render = Handlebars.compile($('#search-results').html());

viewData.printResults = function(data) {
  data.matches.forEach(function(ele) {
    console.log(ele);
    $('#print-results').append(render(ele));
  });
};
