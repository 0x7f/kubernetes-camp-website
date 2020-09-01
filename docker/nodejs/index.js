const express = require('express')
const getenv = require('getenv')

const app = express()
const port = getenv.int('PORT', 3000)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
