const express = require('express');
const app = express();
const mysql = require('mysql');
const path = require('path');

const port = process.env.PORT || 5000;

var connection = mysql.createConnection({
  host: "dekkaii-emerge-fitness.cuwzvi2tojrd.us-east-2.rds.amazonaws.com",
  database: "emerge",
  port: 3306,
  user: "dekkaii",
  password: "arigato41"
});

app.listen(port, () => console.log(`Light Yagami is listening on port ${port}`))

app.use(express.urlencoded());
app.use(express.static('resources'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname + '/pages/about.html'));
});

app.get('/forms/:formId', (req, res) => {
  connection.query(`SELECT * FROM form_questions WHERE form_id = uuid_to_bin(?)`, req.params.formId, 
  function(err, result){
    if(err) throw err;
    let formQuestions = [];
    result.forEach((row) => {
      formQuestions.push(row);
    })
    res.json({'formQuestions': formQuestions})
  })
});

app.post('/forms', (req, res) => {
  console.log(req.body.formtype)
  if (req.body.formtype == 'captureForm'){
    //unique logic for signup form which creates a user in the DB in addition to storing form data
    connection.query(`INSERT INTO user (first_name, last_name, email_address, date_of_birth, phone_mobile)
    VALUES (?, ?, ?, ?, ?)`, [req.body.first_name, req.body.last_name, req.body.email_address, req.body.date_of_birth, req.body.phone_mobile], 
    function(err, result){
      if(err) throw err;
    });
  }
  res.send("yay");
})