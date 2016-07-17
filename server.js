var pg = require('pg');
var express = require('express'),
  port = process.env.PORT || 3000,
  app = express();
// var pg = require('pg');

// app.get('/db', function (request, response) {
//   pg.connect(process.env.DATABASE_URL, function(err, client, done) {
//     client.query('SELECT * FROM users', function(err, result) {
//       done();
//       if (err)
//        { console.error(err); response.send('Error ' + err); }
//       else
//        { response.render('pages/db', {results: result.rows} ); }
//     });
//   });
// });
// Place.fetchAll = function(){
//   $.getJSON('/data', function (result) {
//     console.log('Scott was here');
//     result.rows.forEach(function(item) {
//       if (item.category){
//         item.category = JSON.parse(item.category)
//       }
//       var place = new Place(item);
//       Place.all.push(place);
//
//     });
//   });
// };
// var pg = require('pg');
// app.get('/data', function () {
//   console.log('yes jesssss visited data');
//   pg.defaults.ssl = true;
//   pg.connect(process.env.DATABASE_URL, function(err, client) {
//     if (err) throw err;
//     console.log('Connected to postgres! Getting schemas...');
//
//     client
//     .query('SELECT * FROM users;')
//     .on('row', function(row) {
//       console.log(JSON.stringify(row));
//     });
//   });
// });

app.get('/data', function (req, res) {

  var connectionString = process.env.DATABASE_URL;

  var client = new pg.Client(connectionString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres');
    }
    client.query('select * from users', function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      res.send(result);
      client.end();
    });
  });

});
// app.get('/public/db', function (request, response) {
//   pg.connect(process.env.DATABASE_URL, function(err, client, done) {
//     client.query('SELECT * FROM users', function(err, result) {
//       done();
//       if (err)
//        { console.error(err); response.send('Error ' + err); }
//       else
//       {console.log('No error jessica!');}
//       //  { response.render('pages/db', {results: result.rows} ); }
//     });
//   });
//
// });

app.use(express.static(__dirname + '/public/'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('/public/index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
