const { esclient, es_index, es_type } = require("../elastic");

async function getQuotes(req) {

  const query = {
    query: {
      match: {
        quote: {
          query: req.text,
          operator: "and",
          fuzziness: "auto"
        }
      }
    }
  }

  const { body: { hits } } = await esclient.esclient.search({
    from:  req.page  || 0,
    size:  req.limit || 100,
    index: es_index, 
    type:  es_type,
    body:  query
  });

  const results = hits.total.value;
  const values  = hits.hits.map((hit) => {
    return {
      id:     hit._id,
      quote:  hit._source.quote,
      author: hit._source.author,
      score:  hit._score
    }
  });

  return {
    results,
    values
  }

}

module.exports = {
    getQuotes
  }
