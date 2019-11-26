'use strict';
const Controller = require('egg').Controller;

class ReportController extends Controller {
  async get() {
    const ctx = this.ctx;
    try {
      const { currentModuleId, type } = ctx.request.query;
      if (type === 'delete') {
        const res = await this.delete(ctx);
        if (res.errcode !== 0) {
          throw new Error('err');
        }
        ctx.body = { errcode: 0, message: 'success' };
        return;
      }

      const result = await this.app.mongo.find('test', {
        filter: { currentModuleId },
      });
      ctx.body = result;
      ctx.status = 200;
    } catch (err) {
      ctx.body = { errcode: 1, message: '服务器错误' };
    }
  }
  async post() {
    const ctx = this.ctx;
    const mongo = this.app.mongo;
    const query = ctx.request.body;
    try {

      // 设置响应体和状态码
      const { result } = await mongo.insertOne('test', {
        doc: { ...query },
      });
      if (result.ok !== 1) {
        throw new Error('error');
      }
      ctx.body = { errcode: 0, message: 'success' };
      ctx.status = 200;
    } catch (err) {
      ctx.body = { errcode: 1, message: '服务器错误' };
    }
  }
  async delete(ctx) {
    const mongo = this.app.mongo;
    const query = ctx.request.query;
    console.log('query', query);
    console.log(mongo)
    const ObjectID = require('mongodb').ObjectID;
    try {
      const res = await mongo.findOneAndDelete('test', {
        filter: { _id: new ObjectID(query.id) },
      });
      return { errcode: 0, message: 'success' };
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
module.exports = ReportController;