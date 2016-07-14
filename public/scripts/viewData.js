$("#searchBox").on("submit", function(e) {
  e.preventDefault();
  console.log(this.search.value);
})
