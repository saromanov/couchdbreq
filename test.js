var assert = require('assert');
var cdb = require('./')('localhost', 5984);

it('should insert to couchdb', function() {
    cdb.insert("item8889", {
        foo: "bar",
    }, function(err, statusCode, response) {
        assert.Equal(console.log(response).ok, true);
    });

});

it('should insert with default params', function() {
    var cdb2 = require('./')()
    cdb2.insert("item8889", {
        foo: "bar",
    }, function(err, statusCode, response) {
        assert.Equal(console.log(response).ok, true);
    });
});

it('should get from couchdb', function() {
    cdb.get("/item8889", function(error, statusCode, response) {
        if (statusCode === 404) {
            return;
        }
        assert.Equal(response.db_name, "item8889");
    });
});

it('should delete from couchdb', function() {
    cdb.del("/item8889", function(err, statusCode, response) {
        cdb.get("/item8889", function(error, statusCode, response) {
            assert.Equal(statusCode, 404);
       });
    });
});
