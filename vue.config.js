const {
    defineConfig
} = require('@vue/cli-service');


module.exports = defineConfig(
    {
        transpileDependencies: true,
        chainWebpack: config => {
            config
            .plugin('html')
            .tap(args => {
                console.log(args)
                args[0].title = "Capstone Bud"
                return args
            })
        },
        pwa: {
            iconPaths: {
                favicon32: "someicon.ico",
                favicon16: "someicon.ico"
            }
        }
    }
);