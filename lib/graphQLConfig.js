const { GraphQLClient } = require("graphql-request");

const endpoint = "https://graphql.datocms.com/";
export const graphQLInstance = new GraphQLClient(endpoint, {
  headers: {
    "content-type": "application/json",
    authorization: "Bearer " + process.env.DATOCMS_API_KEY,
  },
});
