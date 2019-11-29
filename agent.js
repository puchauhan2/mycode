const request = require('request');
var os = require("os");
var ip = require("ip");


var myip = ip.address()

//console.log(myip);

const host_name =  os.hostname();
const myaddr = myip + "@" + host_name;



// const hi = {
//     url: 'http://localhost:4000/hi/?hello',
//     method: 'GET',
   
// };

// request(hi, function(err, res, body) {

//     if (err){ 
//         console.log(err)
            
// 	}else {
// 		console.log(body)
// 		console.log(res.statusCode)
// 	;}
		

// });



const ipinfo = {
    url: 'http://ipinfo.io',
    method: 'GET',
   
};

	request(ipinfo, function(err, res, body) {

		if (err){ console.log(err)}
		else {
			ipinfo_res = JSON.parse(body)
			ipinfo_res['agent_name']=myaddr;
			console.log(ipinfo_res)
			console.log(ipinfo_res.ip);
	
			const options = {
				url: 'http://localhost:4000/agentdetails',
                method: 'POST',
                headers :{
                    accept: '*/*',
                    'content-type' : 'application/json'
                },
                body: ipinfo_res, 
                json :true
                
			   
			};
	
			request(options,function(err,res,body){
                console.log("Error:" + err)
                console.log("Response:"  +res)
                console.log("Body:"  +body)
            })
	
		}
	});

