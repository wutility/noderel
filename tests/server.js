const express = require('express')
const app = express()
const port = 3000;

const fn = () => {
  new Promise.resolve('hello')
}

app.get('/', async (req, res) => {
  console.log('Hello v from console')
  const result = await fn();
  console.log(result);
  res.send('Hello NodeRel')
});

app.use('/', require('./routes/index'));

console.log('Look to console: ', 1 + 10 + 11)

app.listen(port, () => {
  console.log(`Server running http://localhost:${port}`)
});