/* main homepage route */

const express = require('express'),
      router = express.Router();

router.get('/', function(req, res){
  res.render('home', {title: 'Abdullah F. Khan'});
});

module.exports = router;