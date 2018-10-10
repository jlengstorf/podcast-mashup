module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'ONEGRAPH',
        fieldName: 'oneGraph',
        url:
          'https://serve.onegraph.com/dynamic?app_id=cf005b0f-864d-49b2-9b61-9404d3d8962c'
      }
    }
  ]
};
