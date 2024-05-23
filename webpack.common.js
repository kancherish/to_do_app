const path = require("path")

const Htmlwebpackplugin = require("html-webpack-plugin")

module.exports = {
    entry:"./src",
    plugins:[new Htmlwebpackplugin({
        template:"./src/index.html"
})],
    module:{
        rules:[
            {
                test:/\.css$/i,
                use:["style-loader","css-loader"]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
              },
              {
                test: /\.(png|svg|webp|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
              },
             
        ]
    },
 
}