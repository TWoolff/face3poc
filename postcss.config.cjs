module.exports = {
  plugins:
    [
      require('postcss-import'),
      require('postcss-nested'),
      require('postcss-preset-env')({
          autoprefixer: {
              flexbox: 'no-2009',
          },
          features: {
              'custom-properties': {
                "disableDeprecationNotice": true
              }
          },
          stage: 0
      })
    ]
}
