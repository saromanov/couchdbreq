var http = require('http');
var querystring = require('querystring');


module.exports = function(opts) {
    var opts = opts || {};
    var host = opts.host;
    var port = opts.port;
    if (opts.host == undefined) {
        host = 'localhost';
    }

    if (opts.port == undefined) {
        port = 5984;
    }

    return {
        get: function(title, fn) {
            var getdata = http.request(getOptions('GET', title, port), function(response) {
                response.setEncoding('utf-8');
                if (response.statusCode === 200) {
                    response.on('data', function(res) {
                        fn('', response.statusCode, res);
                    });

                } else {
                    if (fn === undefined) {
                        return "Path not found";
                    }
                    fn("Path not found", response.statusCode);
                }
            });
            getdata.shouldKeepAlive = false;
            getdata.on('error', function(e) {
                fn(undefined, 404, e);
            });
            getdata.end();

        },

        insert: function(title, data, fn) {
            if (data === undefined) {
                return;
            }
            var newdata = JSON.stringify(data);
            var options = {
                host: host,
                port: port,
                path: "/" + title,
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Content-Length': newdata.length
                }
            };
            create_base(title, port, function() {
                var post = http.request(options, function(request) {
                    request.setEncoding('utf-8');
                    request.on('data', function(res) {
                        fn('', request.statusCode, res);
                    });
                });
                post.write(newdata);
                post.end();
            });

        },

        del: function(title, fn) {
            var deldata = http.request(getOptions('DELETE', title, port), function(response) {
                if (response.statusCode === 200) {
                    fn('', 200, 'Document ' + title + ' was removed');
                } else {
                    fn('Document ' + title + ' not found', response.statusCode, '');

                }
            });
            deldata.end();

        },

    };
};

var create_base = function(title, port, fn) {
    var options = {
        port: port,
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

var getOptions = function(type, title, port, host) {
    return {
        host: host,
        port: port,
        path: "/" + title,
        method: type,
        headers: {
            accept: 'application/json'
        }
    };
};

