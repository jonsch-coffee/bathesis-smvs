const { defineConfig } = require('@vue/cli-service')

// Read enviroment variables from cli-input (e.g.: VUE_APP_ENTRY=search vue-cli-service serve)
const entry = process.env.VUE_APP_ENTRY
const isSearch = entry === 'search'
const isEditor = entry === 'editor'

module.exports = defineConfig({
  filenameHashing: false,
  publicPath: '/',
  transpileDependencies: true,
  productionSourceMap: false,
  css: {
    extract: false // ensures that styles are included in the widget
  },

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
    open: entry ? [`/${entry}.html`] : false // opens webbrowser-windows if dev
  }
})