import { join } from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './../webpack/webpack.config.js';
import { createEngine } from 'express-react-views';

const {
  PORT,
  HOST,
} = process.env;

const app = express();

const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false,
  },
});

app.set('views', join(__dirname, './views'));
app.set('view engine', 'jsx');
app.engine('jsx', createEngine());

app.use(middleware);
app.use(webpackHotMiddleware(compiler));

app.get('*', (req, res) => {
  res.render('index');
  res.end();
});

app.listen(PORT, HOST, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.info(`🌎 Listening on port ${HOST}. Open up http://${HOST}:${PORT}/ in your browser.`);
  }
});
