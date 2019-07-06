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

app.get('/', (req, res) => {
  // res.send("Server online")
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/users', (req, res) => {
  connection.query(`INSERT INTO user (first_name, last_name, email_address, date_of_birth, phone_mobile)
  VALUES (?, ?, ?, ?, ?)`, [req.body.first_name, req.body.last_name, req.body.email_address, req.body.date_of_birth, req.body.phone_mobile], 
  function(err, result){
    if(err) throw err;
    console.log("1 record sucess");
  });
  console.log('we hit the POST');
  res.send("yay");
})