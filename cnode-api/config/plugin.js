'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  mongo: {
    enable: true,
    package: 'egg-mongo-native',
  },
};
