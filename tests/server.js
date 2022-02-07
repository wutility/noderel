const express = require('express')
const app = express()
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello NodeRel')
});

app.use('/', require('./routes/index'));

console.log('Look to console: ', 1 + 10 + 11)

app.listen(port, () => {
  console.log(`Server running http://localhost:${port}`)
});