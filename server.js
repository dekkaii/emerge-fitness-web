const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mysql = require('mysql')

var connection = mysql.createConnection({
  host: "dekkaii-emerge-fitness.cuwzvi2tojrd.us-east-2.rds.amazonaws.com",
  database: "emerge",
  port: 3306,
  user: "dekkaii",
  password: "arigato41"
});

const USER_RETRIEVE_SQL = `INSERT INTO user (first_name, last_name, email_address, date_of_birth, phone_mobile)
VALUES ('Brian', 'Wilson', 'Brian.L.Wilson@protonmail.com', '1990-04-22', '13476385157')`;

app.listen(port, () => console.log(`Light Yagami is listening on port ${port}`))

app.get('/', (req, res) => {
  res.send("Server online")
});

app.post('/users', (req, res) => {
  connection.query(`INSERT INTO user (first_name, last_name, email_address, date_of_birth, phone_mobile)
  VALUES ('Sharif', 'Syed', 'Sharif.chf@gmail.com', '1990-08-07', '12345')`, function(err, result){
    if(err) throw err;
    console.log("1 record sucess");
  });
  console.log('we hit the POST');
  res.send("yay");
})