module.exports = {
    lintOnSave: false,
    outputDir: '../../ims.vopdoo.com/public',
    publicPath: '/',

    // baseURL:'/prototypes/',
    assetsDir: 'assets',

    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        },
        sourceMap: true
    },
    chainWebpack: config => {
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
    productionSourceMap: undefined,
    parallel: undefined
}
