'use strict';

const express = require('express');//
const app = express();
const mongoose = require('mongoose');
//enable promises
let isOn = false;//variable for our server
let http = null;
let PORT = 3000;

module.exports = {
  start: () => {
    return new Promise((resolve, reject) => {
      if(isOn)
        return reject(new Error('__SERVER__ERROR__ server is already on'));
      http = app.listen(PORT, () => {
        console.log('__SERVER__UP', PORT);
        isOn = true;
        resolve();
      });
    });
  },
  stop: () => {
    if(!isOn)
      return reject(new Error('__SERVER__ERROR__ server is already off'));
    if(http)
      return reject(new Error('__SERVER__ERROR__ there is no server to close'));
    http.close(() => {
      console.log('__SERVER__DOWN');
      http = null;
      isOn = false;
      resolve();
    });
  },
};
