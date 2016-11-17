import path from 'path';
import webpack from 'webpack';
import webpackConfig from '../../../webpack.config.js';
import WebpackDevServer from 'webpack-dev-server';


if (process.env.NODE_ENV !== 'production') {
    const config = Object.assign({}, webpackConfig, {
        devtool: 'eval',
        entry: webpackConfig.entry.concat([
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server'
        ]),
        plugins: webpackConfig.plugins.concat([
            new webpack.HotModuleReplacementPlugin()
        ]),
        module: {
            loaders: [{
                test: /\.jsx?$/,
                loaders: ['react-hot'],
                include: path.join(__dirname, '..')
            }]
        }
    });

    // TODO: Use environment variables for port and host
    config.output.publicPath =  'http://localhost:8080/static';

    const server = new WebpackDevServer(webpack(config), {
        contentBase: './dist',
        publicPath: config.output.publicPath,
        hot: true,
        stats: { colors: true }
    });

    // TODO: Use environment variables for port and host
    server.listen(8080, "localhost", function() {});
}
