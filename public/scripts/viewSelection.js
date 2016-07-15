var viewSelection = {};

viewSelection.index = function(ctx) {
  $('#main').children().hide();
  viewSelection.pullRecipe(ctx);
};

viewSelection.pullRecipe = function(ctx) {
  $.getJSON({
    url: 'http://api.yummly.com/v1/api/recipe/' + ctx.params.id,
  },{
    _app_id: '3049d607',
    _app_key: '847fa96c28cfa82d101425ab83cba017',
  }).done(function(data) {
    viewSelection.initSelectionPage(data);
  });
};

var render2 = Handlebars.compile($('#recipe-selection').html());

viewSelection.initSelectionPage = function(data) {
  $('#main').append(render2(data));
};
