# couchdbreq
Very simple client to couchdb.
# Usage

Put to the Couchdb
```javascript
var cdb = new Couchdbreq("localhost", 5984);
cdb.put("item", {foo:"bar"}, function(err, statusCode, response){
    console.log(response);
});
```

Get from the Couchdb
```javascript 
var cdb = new Couchdbreq("localhost", 5984);
cdb.get("item", function(error, statusCode, response) {
    if (statusCode === 404){
        return;
    }
    console.log(response);
});
```

Get all documents
```javascript
var cdb = new Couchdbreq("localhost", 5984);
cdb.get("item/_all_docs", function(error, statusCode, response) {
    if (statusCode === 404){
        return;
    }
    console.log(response);
});
```

Delete from the Couchdb
```javascript 
var cdb = new Couchdbreq("localhost", 5984);
cdb.del("item", function(error, statusCode, response) {
    if (error){
        console.log(error);
        return;
    }
});
```


# License
MIT

