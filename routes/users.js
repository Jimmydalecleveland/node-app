var express = require('express');
var router = express.Router();

router
  .get('/users', (req, res, next) => {
    db("users").then((users) => {
      res.send(users)
    }, next)
  })
  .get('/users/:id', (req, res, next) => {
    const { id } = req.params;

    db("users")
      .where("id", id)
      .first()
      .then((users) => {
        res.send(users)
      }, next)
  })
  .post('/users', (req, res, next) => {
    db("users")
      .insert(req.body)
      .then((userIds) => {
        res.send(userIds)
      }, next)
  })
  .put('/users/:id', (req, res, next) => {
    const { id } = req.params;

    db("users")
      .where("id", id)
      .update(req.body)
      .then((result) => {
        if (result === 0) {
          return res.sendStatus(400);
        }
        res.sendStatus(200)
      }, next)
  })
  .delete('/users/:id', (req, res, next) => {
    const { id } = req.params;

    db("users")
      .where("id", id)
      .delete()
      .then((result) => {
        if (result === 0) {
          res.sendStatus(400);
        }
        res.sendStatus(200)
      }, next)
  })
;

module.exports = router;
