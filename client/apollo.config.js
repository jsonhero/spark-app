module.exports = {
  client: {
    excludes: ['src/**/*.gql'], // array of glob patterns
    service: {
      name: "api-app",
      url: "http://localhost:3000/graphql"
    },
  }
};