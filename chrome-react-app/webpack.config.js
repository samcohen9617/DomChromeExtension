const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = () => {
    return {
            mode: 'production',
            entry: "./src/index.js",
            output: {
                publicPath: "/",
                path: path.resolve(__dirname, "..", "src"),
                filename: "content.js"
            },
            module: {
                rules: [
                    {
                        test: /\.jpe?g|png$/,
                        exclude: /node_modules/,
                        use: ["url-loader", "file-loader"]
                    },
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        loader: "babel-loader"
                    },
                    {
                        test: /\.css$/i,
                        use: ["style-loader", "css-loader"],
                    },
                    {
                        test: /\.svg$/,
                        use: [
                            {
                            loader: 'svg-url-loader',
                            options: {
                                limit: 10000,
                            },
                            },
                        ],
                    },
                ]
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: "./public/index.html"
                }),
            ]
        }
};