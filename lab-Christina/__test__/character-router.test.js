'use strict';

PORT = 3000;
process.env.MONGODB_URI = 'mongodb://localhost/testing';

const faker = require('faker');
const server = require('../lib/server.js');
const character = require('../model/character.js');
const superagent = require('superagent');
const apiURL = `http://localhost${process.env.PORT}`;//why is PORT not defined! But process.env is yet process.env throws an unhandled error while PORT RUNS! fox. Fix hard code method.

const createCharacter = () => {
    return new Character({
      image: faker.random.image(),
      name: faker.name.findName(),
      job: faker.name.jobDescriptor(),
    }).save();//returns a promise that will resolve a character
}

describe('/api/characters', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(() => character.remove({}));//objects work as queries in mongo

  describe('POST /api/characters', () => {
    test('should respond with a character and 200 status', () => {
      let mockcharacter = {
      name: faker.lorem.words(3),
      job: faker.lorem.jobDescriptor(40),
    }
    return superagent.post(`${apiURL}/api/characters`)
    .send(mockcharacter)
    .then(response => {
      expect(response.status).toEqual(200);
      expect(response.body._id).toBeTruthy();
    })
  })
})
