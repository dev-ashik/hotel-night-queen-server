// $npm install express mongodb body-parser cors
// $npm install nodemon --save-dev

const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)