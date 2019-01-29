const http = require('http');
const fs = require('fs');
const express = require('express');
const hbs = require('hbs');

// http.createServer((req, res) => {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.write('Blablabla');
//   res.end();
// }).listen(3000);

var app = express();

// déclaration du moteur de rendu (vue)
app.set('view engine', 'hbs');

// enregisrement du dossier contenant les vues partielles hbs
hbs.registerPartials(__dirname + '/views/partials');

// déclaration du dossier public contenant fichiers statiques
// exemple: http://localhost:3000/lupus.jpg
app.use(express.static(__dirname + '/public'));

// Exemple de middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`;

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Logging impossible');
    }
  });

  next(); // on repasse la main au chemin ciblé

});

// routes
app.get('/', (req, res) => {
  res.send('Ciao !');
});

app.get('/html', (req, res) => {
  var html =
  `
  <!DOCTYPE html>
  <html>
    <head>
      <title>HTML</title>
    </head>
    <body>
      <h1>HTML</h1>
    </body>
  </html>
  `
  res.send(html);
});

app.get('/bad', (req, res) => {
  var access = false;
  if (access) {
    res.render('bad', {title: 'Bad'});
  } else {
    res.status(401).send();
  }
});

app.listen(3000, () => {
  console.log('Serveur écoutant le port 3000...');
})







//



//
