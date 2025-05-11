const { defineConfig } = require('@vue/cli-service');

const entry =  'search';
const isSearch = entry === 'search';

module.exports = defineConfig({
  filenameHashing: false,

  ...(isSearch && {
    configureWebpack: {
      entry: './src/search/main.js',
      output: {
        filename: 'search-widget.js',
        library: {
          name: 'SearchWidget',
          type: 'umd'
        }
      },
      optimization: {
        splitChunks: false
      }
    }
  }),

  publicPath: '/',
  transpileDependencies: true,

  pages: {
    ...(isSearch && {
      search: {
        entry: 'src/search/main.js',
        template: 'public/search.html',
        filename: 'search.html',
        title: 'OP-Code Search'
      }
    }),
    ...(entry === 'editor' && {
      editor: {
        entry: 'src/editor/main.js',
        template: 'public/editor.html',
        filename: 'editor.html',
        title: 'Guide Editor'
      }
    })
  },

  devServer: {
    open: entry ? [`/${entry}.html`] : false
  }
});