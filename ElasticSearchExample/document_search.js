var client = require('./Connection.js').esClient;

// Let's search!
 async function run () {

 const { body } = await client.search({
    index: 'gov',
    body: {
      query: {
        match: {
            constituencyname: "Harwich"
        }
      }
    }
  })

  console.log(body.hits.hits)
}
run().catch(console.log)