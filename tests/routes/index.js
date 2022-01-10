const router = require('express').Router()

router.get('/home', (req, res) => {
  let id = req.query.id
  res.send('id: ' + JSON.parse(id))
});

module.exports = router