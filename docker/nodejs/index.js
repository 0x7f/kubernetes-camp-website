const express = require('express')
const getenv = require('getenv')
const morgan = require('morgan')
const redis = require('redis')

const app = express()
const port = getenv.int('PORT', 3000)
const url = getenv('REDIS_URL', 'redis://127.0.0.1:6379')

const start = Date.now()

const client = redis.createClient({ url })
client.on("error", err => console.error(err))

app.use(morgan('combined'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/ready', (req, res) => {
  const uptime = (Date.now() - start) / 1000
  res.json({ uptime })
})

app.get('/healthy', (req, res) => {
  client.get('somekey', (err, value) => {
    if (err) {
      res.sendStatus(500)
      return
    }
    res.json({})
  })
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

function blockCpuFor(ms) {
  const now = new Date().getTime();
  let result = 0
  let count = 0
  while(true) {
    result += Math.random() * Math.random();
    ++count
    if (new Date().getTime() > now + ms)
      return count;
  }
}

app.get('/load', (req, res) => {
  if (!req.query.msec) {
    res.sendStatus(400)
    return
  }
  const msec = parseInt(req.query.msec, 10)
  const count = blockCpuFor(msec);
  res.json({ count })
})

app.get('/alloc', (req, res) => {
  if (!req.query.bytes || !req.query.msec) {
    res.sendStatus(400)
    return
  }
  const bytes = parseInt(req.query.bytes, 10)
  const msec = parseInt(req.query.msec, 10)
  const buffer = Buffer.alloc(bytes, '0', 'utf-8')
  setTimeout(() => {
    res.json({ bytes: buffer.byteLength, memory: process.memoryUsage() })
  }, msec)
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
