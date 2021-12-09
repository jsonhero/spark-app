module.exports = {
  client: {
    excludes: ['**/__generated__/**/*'],
    service: {
      name: 'backend',
      url: 'http://localhost:3000/graphql',
      // optional headers
      // optional disable SSL validation check
      skipSSLValidation: true
    }
  }
};