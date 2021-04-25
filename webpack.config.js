const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const path = require('path');
const fs = require('fs');
const colors = require('colors');

console.log(`[ ${colors.green.bold('START')} ] Сборка проекта\n`);
console.log(`[ ${colors.blue.bold('INFO')} ] Страницы проекта:`);

const viewsPath = path.join('src', 'pages');
const views = fs.readdirSync(viewsPath);

const pages = views.map(view => {
    console.log(`• ${colors.bold(`${view} — ${colors.blue(`http://localhost:3000/${view}.html`)}`)}`);
    return new HtmlWebpackPlugin({
        filename: `${view}.html`,
        template: `./src/pages/${view}/${view}.pug`
    });
});

console.log('');

// const dataPath = path.join('src', 'assets', 'data');
// const dataJson = {};
// fs.readdirSync(dataPath).forEach(file => {
//     if (file.indexOf('.json') !== -1) {
//         const fileName = file.slice(0, file.indexOf('.json'))

//         try {
//             dataJson[fileName] = JSON.parse(fs.readFileSync(path.join(dataPath, file)));
//             console.log(`[ ${colors.blue.bold('DATA')} ] Загрузка файла: ${colors.bold(file)}`);
//         } catch (e) {
//             console.log(`[ ${colors.red.bold('ERROR')} ] ${colors.bold(file)}: ${e.message}`);
//         }
//     } else {
//         console.log(`[ ${colors.red.bold('ERROR')} ] Ошибка загрузки, файл ${colors.bold(file)} имеет неверное расширение`);
//     }
// });

// console.log('');

module.exports = (env) => {
    const dev = env ? env.WEBPACK_SERVE : false;
    return {
        entry: {
            common: './src/app/js/common.ts',
        },
        output: {
            filename: !!dev ? 'js/[name].js' : 'js/[name].[chunkhash].js',
            path: path.resolve(__dirname, 'build'),
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.pug$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: {
                                attributes: {
                                    list: [
                                        {
                                            tag: 'img',
                                            attribute: 'src',
                                            type: 'src'
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            loader: 'pug-html-loader',
                            // options: {
                            //     data: { dataJson }
                            // }
                        }
                    ]
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: !!dev,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    config: path.resolve(__dirname, 'postcss.config.js'),
                                    sourceMap: !!dev,
                                },
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: !!dev,
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/images/[name].[hash:8].[ext]'
                        }
                    }
                },
                {
                    test: /\.(mp4|avi)$/i,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: !!dev ? 'assets/videos/[name].[ext]' : 'assets/videos/[name].[hash:8].[ext]'
                        }
                    }
                },
                {
                    test: /\.(woff|ttf|otf|eot)$/i,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: !!dev ? 'assets/fonts/[name].[ext]' : 'assets/fonts/[name].[hash:8].[ext]'
                        }
                    }
                },
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: 'svg-sprite-loader',
                            options: {
                                outputPath: 'assets/sprites'
                            }
                        },
                        'svg-transform-loader',
                    ],
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', { targets: "ie 11" }]
                            ]
                        }
                    }
                }
            ]
        },
        resolve: {
            extensions: [ '.tsx', '.ts', '.js', '.pug' ]
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 3000
        },
        plugins: [
            ...pages,
            new MiniCssExtractPlugin({
                filename: !!dev ? 'css/[name].css' : 'css/[name].[chunkhash].css',
                chunkFilename: 'css/[id].css'
            }),
            new SpriteLoaderPlugin({ plainSprite: true }),
            new CleanWebpackPlugin(),
        ]
    }
}