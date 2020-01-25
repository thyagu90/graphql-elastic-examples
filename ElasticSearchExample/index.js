var client = require('./Connection.js').esClient;

client.cluster.health({},function(err,resp,status) {  
  console.log("-- Client Health --",resp);
});