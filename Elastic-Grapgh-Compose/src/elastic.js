const config = require('./config');
const { Client } = require('@elastic/elasticsearch');
var seedData = require('./data/seedData.json');

const esclient = new Client(
      //{ node: `https://${config.es_user}:${config.es_pass}@${config.es_host}:${config.es_port}`}
        { node: `http://${config.es_host}:${config.es_port}`}
    );
const es_index      = config.es_index
const es_type       = config.es_type

/**
 * @function createIndex
 * @returns {void}
 * @description Creates an index in ElasticSearch.
 */

async function createIndex(index) {
    try {
  
      await esclient.indices.create({ index });
      console.log(`Created index ${index}`);
  
    } catch (err) {
  
      console.error(`An error occurred while creating the index ${index}:`);
      console.error(err);
  
    }
  }
  
  /**
   * @function setQuotesMapping,
   * @returns {void}
   * @description Sets the quotes mapping to the database.
   */
  
  async function setQuotesMapping () {
    try {
      const schema = {
        name: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
            },
          },
        },
        gender: {
          type: 'text',
        },
        birthday: {
          type: 'date',
        },
        position: {
          type: 'text',
        },
        relocation: {
          type: 'boolean',
        },
        salary: {
          properties: {
            currency: {
              type: 'text',
            },
            total: {
              type: 'double',
            },
          },
        },
        skills: {
          type: 'text',
        },
        languages: {
          type: 'keyword',
        },
        location: {
          properties: {
            name: {
              type: 'text',
            },
            point: {
              type: 'geo_point',
            },
          },
        },
        experience: {
          properties: {
            company: {
              type: 'text',
            },
            description: {
              type: 'text',
            },
            end: {
              type: 'date',
            },
            position: {
              type: 'text',
            },
            start: {
              type: 'date',
            },
            tillNow: {
              type: 'boolean',
            },
          },
        },
        createdAt: {
          type: 'date',
        }
      };
    
      await esclient.indices.putMapping({ 
        es_index, 
        es_type,
        include_type_name: true,
        body: { 
          properties: schema 
        } 
      })
      
      console.log("Quotes mapping created successfully");
    
    } catch (err) {
      console.error("An error occurred while setting the quotes mapping:");
      console.error(err);
    }
  }
  
  /**
   * @function checkConnection
   * @returns {Promise<Boolean>}
   * @description Checks if the client is connected to ElasticSearch
   */
  
  function checkConnection() {
    return new Promise(async (resolve) => {
  
      console.log("Checking connection to ElasticSearch...");
      let isConnected = false;
  
      while (!isConnected) {
        try {
  
          await esclient.cluster.health({});
          console.log("Successfully connected to ElasticSearch");
          isConnected = true;
  
        // eslint-disable-next-line no-empty
        } catch (_) {
  
        }
      }
  
      resolve(true);
  
    });
  }


  async function populateDatabase() {

  const docs = [];

  seedData.forEach(row => {
    const { id, ...restData } = row;
    docs.push({ index: { _index: config.es_index, _type: config.es_type, _id: id } }, restData);
  });


  return esclient.bulk({ body: docs }).then(() => {
    console.log('Data successfully seeded!');
  });
  
}
  
  module.exports = {
    esclient,
    es_index,
    es_type,
    setQuotesMapping,
    checkConnection,
    createIndex,
    populateDatabase,
  };