var client = require('./connection.js').esClient;

/*
//check the cluster health status
client.cluster.health({}, function (err, resp, status) {
    console.log("-- Client Health --", resp);
});
*/

client.count({index: 'quotes',type: 'quote'},function(err,resp,status) {  
    console.log("quotes",resp);
  });