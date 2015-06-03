var http = require('http');
var querystring = require('querystring');


var Couchdbreq = function(host, port) {
    if(typeof host !== 'string'){
        throw "Host param must be string";
    }
    if (typeof port !== 'number'){
        throw "Port param must be number";
    }
    this.host = host;
    this.port = port;
};

//Get data from Couchdb
Couchdbreq.prototype.get = function(title, fn) {
    var getdata = http.request(getOptions('GET', title, this.port), function(response) {
        response.setEncoding('utf-8');
        if (response.statusCode === 200) {
            response.on('data', function(res) {
                fn('', response.statusCode, res);
            });

        } else {
            fn("Path not found", response.statusCode);
        }
    });
    getdata.shouldKeepAlive = false;
    getdata.on('error', function(e) {
        fn(undefined, 404, e);
    });
    getdata.end();
};

//Store data to Couchdb
Couchdbreq.prototype.insert = function(title, data, fn) {
    if (data === undefined){
        return;
    }
    var newdata = JSON.stringify(data);
    var options = {
        host: this.host,
        port: this.port,
        path: "/" + title,
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'Content-Length': newdata.length
        }
    };
    this._create_base(title, function() {
        var post = http.request(options, function(request) {
            request.setEncoding('utf-8');
            request.on('data', function(res) {
                fn('', request.statusCode, res);
            });
        });
        post.write(newdata);
        post.end();
    });
};

Couchdbreq.prototype._create_base = function(title, fn) {
    var options = {
        port: this.port,
        path: "/" + title,
        method: 'PUT',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'Content-Length': title.length
        }
    };

    var post = http.request(options, function(request) {
        request.setEncoding('utf-8');
        request.on('data', function(res) {
            fn('', request.statusCode, res);
        });
    });
    post.end();
};


Couchdbreq.prototype.del = function(title, fn) {
    var deldata = http.request(getOptions('DELETE', title, this.port), function(response) {
        if (response.statusCode === 200) {
            fn('', 200, 'Document ' + title + ' was removed');
        } else {
            fn('Document ' + title + ' not found', response.statusCode, '');

        }
    });
    deldata.end();
};

var getOptions = function(type, title, port) {
    return {
        port: port,
        path: "/" + title,
        method: type,
        headers: {
            accept: 'application/json'
        }
    };
};


module.exports = Couchdbreq;
