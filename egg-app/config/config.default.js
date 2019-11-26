'use strict';

module.exports = appInfo => {
  const config = {
    keys: 'egg-app',
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks' //左边写成.html后缀，会自动渲染.html文件
    }
  };
  return config;
};
