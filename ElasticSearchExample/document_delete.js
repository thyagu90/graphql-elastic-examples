var client = require('./Connection.js').esClient;

client.delete({  
    index: 'gov',
    id: '1',
    type: 'constituencies'
  },function(err,resp,status) {
      console.log(resp);
  });