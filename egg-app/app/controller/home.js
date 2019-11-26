'use strict';

const Controller = require('fm-egg-plus').Controller;
const fs = require('fs')
const path = require('path')
class Home extends Controller {
  async trackAssets() {
    const trackId = require(path.join(`${process.cwd()}/build/statics/track-assets.json`))
    this.ctx.body = trackId;
  }

  async isIOS() {
    const trackIdPath = require(path.join(`${process.cwd()}/build/statics/track-assets.json`))
    await this.ctx.render('index', {
      trackId: JSON.stringify(trackIdPath)
    });
  }

  async getFramework() {
    this.ctx.body = this.ctx.app.config.test;
  }
}

module.exports = Home;
