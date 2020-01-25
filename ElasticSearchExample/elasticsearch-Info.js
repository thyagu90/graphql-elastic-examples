var client = require('./Connection.js').esClient;

/*
//check the cluster health status
client.cluster.health({}, function (err, resp, status) {
    console.log("-- Client Health --", resp);
});
*/

client.count({index: 'gov',type: 'constituencies'},function(err,resp,status) {  
    console.log("constituencies",resp);
  });