'use strict'

const { Client } = require('@elastic/elasticsearch');
const config = require('./Config');

const client = new Client(
      //{ node: `https://${config.es_user}:${config.es_pass}@${config.es_host}:${config.es_port}`}
        { node: `http://${config.es_host}:${config.es_port}`}
    );

module.exports.esClient= client;