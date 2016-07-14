var express = require('express'),
  port = process.env.PORT || 3000,
  app = express();

app.use(express.static(__dirname + '/public/'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('/public/index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
