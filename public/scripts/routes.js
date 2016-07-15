page('/', homeController.index);

page('/search', searchController.index);

page('/list', listController.index);

page('/myRecipes', myRecipesController.index);

page('/recipe', recipeController.index);

page();

// page('/search/:searchResults',
//   resultsController.loadAll,
//   resultsController.index);

// page('/search/:clickedRecipe',
//   recipeController.)

//
// /list
// /clicked recipe
// (stretch: /savedRecipes)
//
// page('/',
//   articlesController.loadAll,
//   articlesController.index);
//
// page('/about', aboutController.index);
//
// page('/article/:id',
//   articlesController.loadById,
//   articlesController.index);
//
// // Redirect home if the default filter option is selected:
// page('/category', '/');
// page('/author', '/');
//
// page('/author/:authorName',
//   articlesController.loadByAuthor,
//   articlesController.index);
//
// page('/category/:categoryName',
//   articlesController.loadByCategory,
//   articlesController.index);
//
// page();
//
//
//
//
//
// page('/', homeController.index);
//
// page('/projects',
//   projectController.loadAll,
//   projectController.index);
//
// page('/about', aboutController.index);
// page('/stats', statsController.index);
// page('*', function(){
//   $('#404').show().siblings().hide();
// });
