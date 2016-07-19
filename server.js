var pg = require('pg');
var express = require('express'),
  port = process.env.PORT || 3000,
  app = express();

app.get('/data', function (req, res) {
  console.log(req.query.email);
  var connectionString = process.env.DATABASE_URL;

  var client = new pg.Client(connectionString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres');
    }
    client.query('select * from users where email=$1', [req.query.email], function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      res.send(result);
      client.end();
    });
  });

});


app.get('/adduser', function (req, res) {
  console.log(req.query);
  var data = {email: req.query.email, pass: req.query.pass};
  console.log(data.email);
  console.log(data.pass);

  var connectionString = process.env.DATABASE_URL;

  var client = new pg.Client(connectionString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres');
    }

    client.query('INSERT INTO users (email, password) VALUES ($1, $2)', [data.email, data.pass], function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      client.end();
    });
  });

  res.sendFile('/public/index.html', { root: '.' }); //not redirecting
});

app.use(express.static(__dirname + '/public/'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('/public/index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
