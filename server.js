const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const db = require('./server/db/init.js');
const userRouter = require('./server/routers/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/users', userRouter);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

