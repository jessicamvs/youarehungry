var viewData = {};

$('#searchBox').on('submit', function(e) {
  e.preventDefault();
  var result = this.search.value;
  getData.runSearch(result);
});

var template = $('#search-results').html();
var render = Handlebars.compile(template);

viewData.printResults = function(data) {
  data.matches.forEach(function(ele) {
      console.log(ele);
      $("#print-results").append(render(ele));
  });
}
