var client = require('./Connection.js').esClient;

client.indices.create({
    index: 'gov'
}, function (err, resp, status) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(status)
        console.log("create", resp);
    }
});