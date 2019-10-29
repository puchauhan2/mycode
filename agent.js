const request = require('request');
var os = require("os");
var ip = require("ip");


var myip = ip.address()

//console.log(myip);

const host_name =  os.hostname();

const myaddr = myip + "@" + host_name;

console.log(myaddr);


const options = {
    url: 'http://54.197.66.192:4000/hi/?hello',
    method: 'GET',
   
};

request(options, function(err, res, body) {

    if (err){ console.log(err)}
	else {
		console.log(body)
		console.log(res.statusCode)
	;}
		

});



const ipinfo = {
    url: 'http://ipinfo.io',
    method: 'GET',
   
};


request(ipinfo, function(err, res, body) {

    if (err){ console.log(err)}
	else {
		console.log(body)
		console.log(res.statusCode);
	}
		


});