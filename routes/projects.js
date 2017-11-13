/* portfolio page route */

const express = require('express'),
      router = express.Router();

router.get('/', function(req, res){
  res.render('portfolio/portfolio', {title: 'Portfolio | Abdullah F. Khan',
                      author: 'Abdullah F. Khan',
                      description: 'Hello, I\'m Abdullah. Welcome to my home, on the internet.'});
});

module.exports = router;