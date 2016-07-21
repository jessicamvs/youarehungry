page('/', homeController.index);

page('/login', loginController.index);

page('/signup', signupController.index);

page('/search', searchController.index);

page('/list', listController.index);

page('/:id', viewSelection.index);

page();
