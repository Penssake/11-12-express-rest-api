'use strict';

const {Router} = require('express');
const httpErrors = require('http-errors');
const jsonParser = require('body-parser').json();//not necessary for get request.

const Character = require('../model/character.js');
const characterRouter = module.exports = new Router();

characterRouter.post('/api/characters', jsonParser, (request, response, next) => {
  if (!request.body.image || !request.body.name || !request.body.job)
    next(httpErrors(400, 'Image__Name__Job-Description__ALL REQUIRED'));

  new Character(request.body).save()
    .then(character => response.json(character))
    .catch(next);
});

characterRouter.get('./api/characters/:id', (request, response, next) => {
  Character.findById(request.params.id)
    .then(character => {
      if(!character) throw httpErrors(404, 'character not found');
      response.json(character);
    })
    .catch(next);
});
