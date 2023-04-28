// Importer avhengigheter
const express = require('express');
const mysql = require('mysql');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

const path = require('path');


// Opprett en tilkobling til MySQL-databasen
var con=mysql.createConnection({host:"testdatabasechristian.mysql.database.azure.com", user:"azureuser", 
password:"Passord1", database:"test", port:3306, ssl:{ca:fs.readFileSync("DigiCertGlobalRootCA.crt (1).pem")}});

// Set the views directory to 'public'
app.set('views', path.join(__dirname, 'public'));

app.use(express.static(path.join(__dirname, 'public')));

// Koble til databasen
con.connect((err) => {
  if (err) {
    console.error('Feil ved tilkobling til MySQL-databasen: ' + err.stack);
    return;
  }
  console.log('Tilkoblet til MySQL-databasen med ID ' + con.threadId);
});


// Angi visningsmotoren til EJS
app.set('view engine', 'ejs');

// Legg til støtte for å parse URL-kodede data
app.use(bodyParser.urlencoded({ extended: false }));

// Definer en rute for å vise alle innlegg
app.get('/', (req, res) => {
  con.query('SELECT * FROM innlegg', (error, results) => {
    if (error) throw error;
    res.render('index.ejs', { innlegg: results });
  });
});

// Definer en rute for å legge til et innlegg
app.post('/legg-til-innlegg', (req, res) => {
  const { tittel, tekst } = req.body;
  con.query('INSERT INTO innlegg (tittel, tekst) VALUES (?, ?)', [tittel, tekst], (error, result) => {
    if (error) throw error;
    res.redirect('/');
  });
});

// Definer en rute for å fjerne et innlegg
app.post('/fjern-innlegg/:id', (req, res) => {
  const id = req.params.id;
  con.query('DELETE FROM innlegg WHERE id = ?', id, (error, result) => {
    if (error) throw error;
    res.redirect('/');
  });
});

// Definer en rute for å redigere et innlegg
app.post('/rediger-innlegg/:id', (req, res) => {
  const id = req.params.id;
  const { tittel, tekst } = req.body;
  con.query('UPDATE innlegg SET tittel = ?, tekst = ? WHERE id = ?', [tittel, tekst, id], (error, result) => {
    if (error) throw error;
    res.redirect('/');
  });
});

const PORT = 3000

// Start serveren
app.listen(PORT, () => {
  console.log('Serveren lytter på port: ', PORT);
});
