const passport = require('passport');
const router = require('express').Router();
const db = require('../db');

function loginRequired(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }

  next();
}

function adminRequired(req, res, next) {
  if(!req.user.is_admin) {
    return res.render('403');
  }

  next();
}

router
  .get('/posts', loginRequired, (req, res, next) => {
    db('posts')
      .where('user_id', req.user.id)
      .then(posts => {
        res.render('posts', {
          title: 'Your Posts',
          posts: posts
        })
      })
  })
  .get('/allPosts', loginRequired, adminRequired, (req, res, next) => {
    db('posts')
      .then(posts => {
        res.render('posts', {
          title: 'All Users Posts',
          posts: posts
        })
      })
  })
  .get('/deletePost/:id', loginRequired, adminRequired, (req, res, next) => {
    db('posts')
      .where('id', req.params.id)
      .delete()
      .then(result => {
        if (result === 0) {
          return res.send("Error, could not delete post")
        }
        res.redirect('/allPosts')
      })
  })

module.exports = router;
