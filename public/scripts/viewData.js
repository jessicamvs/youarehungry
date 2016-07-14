var viewData = {};

$("#searchBox").on("submit", function(e) {
  e.preventDefault();
  var result = this.search.value;
  getData.runSearch(result);
});

viewData.printResults = function(data) {
  data.matches.forEach(function(ele) {
    console.log(ele);
  });
}
