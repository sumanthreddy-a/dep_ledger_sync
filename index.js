/**
 * Copyright 2018 Intel Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ----------------------------------------------------------------------------
 */
'use strict'

const db = require('./db')
const subscriber = require('./subscriber')
const protos = require('./subscriber/protos')


// const express = require('express')
// const app = express()
// app.listen(3000,()=>{

// })
const mongoose = require('mongoose')
mongoose.connect('mongodb://dep1:dep123@ds157702.mlab.com:57702/dep1');
mongoose.connection.on('error', function (err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});
Promise.all([
    db.connect(),
    protos.compile()
  ])
  .then(subscriber.start)
  .catch(err => console.error(err.message))