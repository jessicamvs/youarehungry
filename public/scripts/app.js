var keyString = "&_app_key=847fa96c28cfa82d101425ab83cba017";
var idString = "?_app_id=3049d607";

function pullTest(recipe, ingredients) {

$.ajax({
  url: 'http://api.yummly.com/v1/api/recipes' + idString + keyString + '&q=' + recipe + '&allowedIngredient[]=' + ingredients,
  type: 'GET',
  dataType: 'JSON',
  // headers: {'authorization': 'token ' + key},
  success: function(data) {
    data.forEach(function(ele) {
      console.log(ele);
    });
  }
})
};
