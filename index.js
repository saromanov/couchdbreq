var http = require('http');
var querystring = require('querystring');


var Couchdbreq = function(host, port){
    this.host = host;
    this.port = port;
};

//Get data from Couchdb
Couchdbreq.prototype.get = function(title){
     var getdata = http.request(getOptions('GET', title, this.port), function(response) {
         response.setEncoding('utf-8');
         if(response.statusCode === 200) {
              response.on('data', function(res){
                  console.log("this is: ", res);
             });

         }
     });

     getdata.on('error', function(e){
         console.log("Found error: ", e);
     });
     getdata.end();
};

//Store data to Couchdb
Couchdbreq.prototype.put = function(title, data) {
    var newdata = querystring.stringify(data);
    var options =  {
        port: this.port, 
        path: "/" + title, method:'PUT',
         headers: {
                accept: 'application/json', 'Content-Type':'application/json', 'Content-Length':newdata.length
        }
        };
    var post = http.request(options,function(request) {
        request.setEncoding('utf-8');
        request.on('data', function(res){
           console.log(res);
        });
    });

    post.on('error', function(e) {
        console.log('problem with request: ' + e);
   });
    post.write(newdata);
    post.end();
};

var getOptions = function(type, title, port) {
   return {port: port, path: "/" + title, method:type, headers: {accept: 'application/json'}};
};

module.exports = Couchdbreq;


