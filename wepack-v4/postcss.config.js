/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-30 19:39:20
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-09-26 10:29:34
 * @FilePath: \wepack-v4\postcss.config.js
 */
module.exports = {
  plugins: [
    require('cssnano'),
    require('autoprefixer')({
      overrideBrowserslist: [
        'last 2 versions',
        'Firefox ESR',
        '> 1%',
        'ie >= 8',
        'iOS >= 8',
        'Android >= 4'
      ],
    })
  ]
};