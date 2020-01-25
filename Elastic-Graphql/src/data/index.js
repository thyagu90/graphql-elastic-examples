const elastic = require("../elastic");
var quotes = require("./quotes.json");
const config = require('../config');
var esclient = require('../connection.js').esClient;

/**
 * @function createESAction
 * @returns {{index: { _index: string, _type: string }}}
 * @description Returns an ElasticSearch Action in order to
 *              correctly index documents.
 */

 
const esAction = {
  index: {
    _index: config.es_index,
    _type: config.es_type,
  }
};

/**
 * @function pupulateDatabase
 * @returns {void}
 */

async function populateDatabase() {

  const docs = [];

  for (const quote of quotes) {
    docs.push(esAction);
    docs.push(quote);
  }

  return esclient.bulk({ body: docs });
  
}

module.exports = {
  populateDatabase
};