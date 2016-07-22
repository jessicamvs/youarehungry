var pg = require('pg');
var express = require('express'),
  port = process.env.PORT || 3000,
  app = express();

app.get('/data', function (req, res) {
  console.log(req.query.email);
  var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/lillianszugyi';

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

  var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/lillianszugyi';

  var client = new pg.Client(connectionString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres');
    }

    client.query('INSERT INTO users (email, password) VALUES ($1, $2)', [data.email, data.pass], function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      res.send(result);
      client.end();
    });
  });
});

app.get('/ingredients', function (req, res) {
  console.log(req.query.userid);
  console.log('hello lillianszugyi');
  var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/lillianszugyi';

  var client = new pg.Client(connectionString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres');
    }
    client.query('SELECT ingredient FROM ingredients WHERE userid=$1', [req.query.userid], function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      res.send(result);
      client.end();
    });
  });

});

app.get('/deleteFromList', function (req, res) {
  console.log('DELETING INGREDIENTS');
  console.log('ingredient: ' + req.query.ingredient);
  var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/lillianszugyi';

  var client = new pg.Client(connectionString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres');
    }
    client.query('delete FROM ingredients WHERE ingredient=$1', [req.query.ingredient], function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      client.end();
    });
  });

});

app.get('/deleteAllFromList', function (req, res) {
  console.log('DELETING ALL INGREDIENTS');
  console.log('id: ' + req.query.id);
  var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/nassirisaf';

  var client = new pg.Client(connectionString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres');
    }
    client.query('DELETE FROM ingredients WHERE userid=$1', [req.query.id], function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      client.end();
    });
  });

});

app.get('/addToList', function (req, res) {
  console.log('/addtolist req', req.query.values);
  console.log('ADDING INGREDIENTS');

  var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/lillianszugyi';

  var client = new pg.Client(connectionString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres');
    }
    client.query('INSERT INTO ingredients (userid, ingredient) VALUES ' + req.query.values, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      client.end();
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
