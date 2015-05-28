# couchdbreq
Very simple client to couchdb.
# Usage

Put to the Couchdb
```javascript
var cdb = new Couchdbreq("localhost", 5984);
cdb.put("item", {foo:"bar"}, function(err, response){
    console.log(response);
});
```

Get from the Couchdb
```javascript 
var cdb = new Couchdbreq("localhost", 5984);
cdb.get("item", function(error, response) {
    if (error)
        return;
    console.log(response);
});
```

Delete from the Couchdb
```javascript 
var cdb = new Couchdbreq("localhost", 5984);
cdb.del("item", function(error, response) {
    if (error)
        return;
});
```


# License
MIT

