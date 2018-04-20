const express = require('express'),
  Img = require('./imgSchema'),
  router = express.Router();

router.get('/', (req, res) => {
  Img.find((err, imgs) => {
    if (err) return console.error(err);
    return res.json(imgs);
  });
});

router.post('/new', (req, res) => {
  // create a new img
  Img.create({ title: req.body.title, link: req.body.link }, (err, newImg) => {
    if (err) {
      console.log(err);
    } // saved!
    res.json(newImg);
  });
});

router.get('/img/:id', (req, res) => {
  // const id = req.params.id;
  Img.findById(req.params.id, (err, foundImg) => {
    if (err) return console.error(err);
    return res.json(foundImg);
  });
});

module.exports = router;
