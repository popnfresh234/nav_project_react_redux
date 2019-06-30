const HtmlWebpackPlugin = require( 'html-webpack-plugin' );


module.exports = {
  entry: './src/Index.jsx',
  plugins: [
    new HtmlWebpackPlugin( {
      filename: 'index.html', // Will save file as this name
      template: './public/index.html', // Source file for adding bundle.js to
    } ),
  ],
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties'],

          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      }, {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
};
