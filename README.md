# couchdbreq [![Build Status](https://travis-ci.org/saromanov/couchdbreq.svg?branch=master)](https://travis-ci.org/saromanov/couchdbreq)
Very simple client to couchdb.

## Install

## Usage

Put to the Couchdb
```javascript
var cdb = require('couchdbreq')();
//This is same as
//var cdb = require('couchdbreq')({host: "localhost", port: 5984});
cdb.insert("item", {foo:"bar"}, function(err, statusCode, response){
    console.log(response);
});
```

Get from the Couchdb
```javascript 
cdb.get("item", function(error, statusCode, response) {
    if (statusCode === 404){
        return;
    }
    console.log(response);
});
```

Get all documents
```javascript
cdb.get("item/_all_docs", function(error, statusCode, response) {
    if (statusCode === 404){
        return;
    }
    console.log(response);
});
```

Delete operation
```javascript 
cdb.del("item", function(error, statusCode, response) {
    if (error){
        console.log(error);
        return;
    }
});
```


# License
MIT

