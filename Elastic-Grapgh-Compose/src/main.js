var esclient = require('./elastic');
//const server  = require("./server");
(async function main() {

    const isElasticReady = await esclient.checkConnection();
  
    if (isElasticReady) {
  
      const elasticIndex = await esclient.esclient.indices.exists({index: esclient.es_index});
  
      if (!elasticIndex.body) {
        await esclient.createIndex(esclient.es_index);
        await esclient.setQuotesMapping();
        await esclient.populateDatabase();
      }
      //server.start();
    }
  
  })();