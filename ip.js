
const request = require('request');


const ipinfo = {
    url: 'http://ipinfo.io',
    method: 'GET',
   
};


request(ipinfo, function(err, res, body) {

    if (err){ console.log(err)}
	else {
		//console.log(body)
		//console.log(res.)
		}
		
		var ips = JSON.parse(body);

		console.log(ips.city)
		


});