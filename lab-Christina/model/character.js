'use strict';

const mongoose = require('mongoose');
//__ID is a primary key MONGO database ID
const characterSchema = mongoose.Schema({
  image: {type:String, required:true, unique:true},
  name: {type:String, required:true, unique:true},
  job: {type:String, required:true, unique:true},
});

module.exports = mongoose.model('character', characterSchema);
