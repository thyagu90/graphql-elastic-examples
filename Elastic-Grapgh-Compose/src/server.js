var express = require('express');
var graphqlHTTP = require('express-graphql');
const { graphql} =  require('graphql-compose');
const {elasticApiFieldConfig } =  require('graphql-compose-elasticsearch');

const { GraphQLSchema, GraphQLObjectType } = graphql;
//var schema = require('./schema');

const generatedSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: {
        elastic50: elasticApiFieldConfig({
          host: 'http://192.168.137.37:9200',
          apiVersion: '7.0',
          log: 'trace',
        }),
      },
    }),
  });

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: generatedSchema,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');

