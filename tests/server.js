const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {  
  console.log('Hello NodeRel from console')
  res.send('Hello NodeRel')
});

app.use('/', require('./routes/index'))

app.listen(port, () => {
  console.log(`Server running http://localhost:${port}`)
});