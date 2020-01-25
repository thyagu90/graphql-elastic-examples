const {esclient} = require('./elastic');
const elasticSearchSchema = require('./elastic.schema');

/**
 * TODO Ping the CLIENT to be sure 
 * *** ElasticSearch *** is up
 */
esclient.ping(function (error) {
  error
    ? console.error('ElasticSearch cluster is down!'+error)
    : console.log('ElasticSearch is ok');
});

function ElasticSearchClient(body) {
  // perform the actual search passing in the index, the search query and the type
  return esclient.search({index: 'quotes', body: body});
}

function ApiElasticSearchClient(req, res) {
  // perform the actual search passing in the index, the search query and the type
  ElasticSearchClient({...elasticSearchSchema})
    .then(r => {
       
        console.log(r.body.hits.hits)
        res.send(r.body.hits.hits)
})
    .catch(e => {
      console.error(e);
      res.send([]);
    });
}

module.exports = {
  ApiElasticSearchClient,
  ElasticSearchClient
};