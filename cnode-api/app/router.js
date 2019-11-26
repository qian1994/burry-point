'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/report', controller.report.get);
  router.post('/report', controller.report.post);
  router.delete('/report', controller.report.delete);
};
