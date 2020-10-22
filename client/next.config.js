/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-22 14:38:08
 * @modify date 2020-10-22 14:38:08
 * @desc Docker container reloading fix. Makresures all files are synced with container every 300ms
 */
module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
};
