const express = require('express')
const getenv = require('getenv')
const redis = require('redis')

const app = express()
const port = getenv.int('PORT', 3000)
const url = getenv('REDIS_URL', 'redis://127.0.0.1:6379')

const client = redis.createClient({ url })
client.on("error", err => console.error(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/get_value', (req, res) => {
  if (!req.query.name) {
    res.sendStatus(400)
    return
  }
  client.get(req.query.name, (err, value) => {
    if (err) {
      res.sendStatus(500)
      return
    }
    res.json({value})
  })
})

app.get('/set_value', (req, res) => {
  if (!req.query.name || !req.query.value) {
    res.sendStatus(400)
    return
  }
  client.set(req.query.name, req.query.value, (err) => {
    if (err) {
      res.sendStatus(500)
      return
    }
    res.sendStatus(204)
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
