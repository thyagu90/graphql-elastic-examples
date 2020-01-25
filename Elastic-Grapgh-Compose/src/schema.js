/* @flow */

var esclient = require('./elastic');
const { graphql, ObjectTypeComposer } =  require('graphql-compose');
const { composeWithElastic, elasticApiFieldConfig } =  require('graphql-compose-elasticsearch');

const { GraphQLSchema, GraphQLObjectType } = graphql;

// Mapping obtained from ElasticSearch server
// If you have existed index in ES you may load mapping via
//   GET http://user:pass@localhost:9200/demo_user/_mapping
//   and then get subtree of returned document which contains
//   properties definitions (which looks like following data):
const demoUserMapping = {
  properties: {
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
    },
  },
};

const UserEsTC = composeWithElastic({
  graphqlTypeName: 'UserES',
  elasticIndex:esclient.es_type,
  elasticType: esclient.es_type,
  elasticMapping: demoUserMapping,
  elasticClient: esclient.esclient,
  // elastic mapping does not contain information about is fields are arrays or not
  // so provide this information explicitly for obtaining correct types in GraphQL
  pluralFields: ['skills', 'languages'],
});

const ProxyTC = ObjectTypeComposer.createTemp(`type ProxyDebugType { source: JSON }`);
ProxyTC.addResolver({
  name: 'showArgs',
  kind: 'query',
  args: {
    source: 'JSON',
  },
  type: 'ProxyDebugType',
  resolve: ({ args }) => args,
});

UserEsTC.addRelation('showRelationArguments', {
  resolver: () => ProxyTC.getResolver('showArgs'),
  prepareArgs: {
    source: source => source,
  },
  projection: {
    name: true,
    salary: true,
  },
});


const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      userSearch: UserEsTC.getResolver('search').getFieldConfig(),
      userSearchConnection: UserEsTC.getResolver('searchConnection').getFieldConfig(),
      elastic50: elasticApiFieldConfig({
        host: 'http://192.168.137.37:9200',
        log: 'trace',
      }),
    },
  }),
});

module.exports = {
   schema
  };