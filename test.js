var assert = require('assert');
var cdb = require('./')('localhost', 5984);

it('should insert to couchdb', function() {
    cdb.insert("item8889", {
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
