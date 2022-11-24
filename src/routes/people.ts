import express from 'express';
const router = express.Router();
// Controllers
const people = require('../controllers/people');

router.get('/list-people', people.getPeople);

module.exports = router;
