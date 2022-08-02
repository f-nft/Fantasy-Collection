<<<<<<< HEAD

=======
>>>>>>> 3ca34b6ceb769c0232b6a472f8dc3298711aff63
const webpack = require("webpack")

module.exports = function override(config, env) {
    //do stuff with the webpack config...
    config.resolve.fallback = {
        ...config.resolve.fallback,
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer"),
        crypto: require.resolve("crypto-browserify"),
        assert: require.resolve("assert"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        os: require.resolve("os-browserify"),
        url: require.resolve("url"),
    }
<<<<<<< HEAD
    config.resolve.extensions = [...config.resolve.extensions, ".ts", ".js",".jsx"]
    config.ignoreWarnings = [/Failed to parse source map/]
=======
    config.resolve.extensions = [
        ...config.resolve.extensions, ".ts", ".js", ".jsx"]
    // config.ignoreWarnings = [/Failed to parse source map/]
>>>>>>> 3ca34b6ceb769c0232b6a472f8dc3298711aff63
    config.plugins = [
        ...config.plugins,
        new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: ["buffer", "Buffer"],
<<<<<<< HEAD

        }),
        
    ]

    return config
}




/* Older version */
// const webpack = require("webpack")

// // final version of the file
// module.exports = function override(config) {
//      //do stuff with the webpack config...
// const fallback = config.resolve.fallback || {};
// Object.assign(fallback, {
// "crypto": require.resolve("crypto-browserify"),
// "stream": require.resolve("stream-browserify"),
// "assert": require.resolve("assert"),
// "http": require.resolve("stream-http"),
// "https": require.resolve("https-browserify"),
// "os": require.resolve("os-browserify"),
// "url": require.resolve("url"),
// "buffer":require.resolve("buffer"),
// })
// config.resolve.fallback = fallback;
//  config.ignoreWarnings = [/Failed to parse source map/];
// return config;
// }
=======
        }),
    ]
    return config
}
>>>>>>> 3ca34b6ceb769c0232b6a472f8dc3298711aff63
