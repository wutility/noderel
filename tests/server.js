const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('dd World! fdf')
})

app.use('/', require('./routes/index'))

app.listen(port, () => {
  console.log(process.pid);
  console.log(`Server running http://localhost:${port}`)

})