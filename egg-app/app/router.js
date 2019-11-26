'use strict';

module.exports = app => {
  const { router, controller } = app;

  const adaptor = app.middleware.adaptor();


  router.get('/', adaptor, controller.home.isIOS);
  router.get('/framework', controller.home.getFramework);
  router.get('/trackAssets', controller.home.trackAssets);
};
