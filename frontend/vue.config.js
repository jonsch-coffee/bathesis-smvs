const { defineConfig } = require('@vue/cli-service')

// Umgebungsvariable lesen
const entry = process.env.VUE_APP_ENTRY
const isSearch = entry === 'search'
const isEditor = entry === 'editor'

module.exports = defineConfig({
  filenameHashing: false,
  publicPath: '/',
  transpileDependencies: true,

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

  ...(isEditor && {
    configureWebpack: {
      entry: './src/editor/main.js',
      output: {
        filename: 'editor-widget.js',
        library: {
          name: 'EditorWidget',
          type: 'umd'
        }
      },
      optimization: {
        splitChunks: false
      }
    }
  }),

  pages: {
    ...(isSearch && {
      search: {
        entry: 'src/search/main.js',
        template: 'public/search.html',
        filename: 'search.html',
        title: 'OP-Code Search'
      }
    }),
    ...(isEditor && {
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
})