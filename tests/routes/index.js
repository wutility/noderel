const router = require('express').Router()

router.get('/home', (req, res) => {
  res.send('home router vv')
})

module.exports = router