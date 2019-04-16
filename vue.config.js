const path = require('path');
const resolve = dir => require('path').join(__dirname, dir);
module.exports = {
    lintOnSave: false,
    outputDir: '../../ims.vopdoo.com/public',
    publicPath: '/',
    assetsDir: 'assets',
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        },
        sourceMap: true
    },
    pages: {
        index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    configureWebpack:  {
        resolve: {
            alias: {
                '@': resolve('examples'),
                '@ims': resolve('src'),
                '@dist': resolve('dist'),
            },
        },
    },
    chainWebpack: config => {
        config.module
            .rule('js')
            .test(/\.js$/)
            .include
            .add(path.join(__dirname, 'src'))
            .end()
            .use('babel')
            .loader('babel-loader')
            .tap(options => {
                // 修改它的选项...
                return options
            })
        config.module
            .rule('vue')
            .test(/\.vue$/)
            .use('iview-loader')
            .loader('iview-loader')
            .options({
                prefix: true
            })
    },

    baseUrl: undefined,
    runtimeCompiler: undefined,
    parallel: undefined
}
