var express = require('express'),
  port = process.env.PORT || 3000,
  app = express();
var pg = require('pg');

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM users', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send('Error ' + err); }
      else
      {console.log('No error jessica!');}
      //  { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

app.use(express.static(__dirname + '/public/'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('/public/index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
