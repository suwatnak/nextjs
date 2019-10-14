require('dotenv').config()
const express = require('express')
const next = require('next')
const { Router } = require('./routes')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  Router.forEachPattern((page, pattern, defaultParams) => server.get(pattern, (req, res) =>
    app.render(req, res, `/${page}`, Object.assign({}, defaultParams, req.query, req.params))
  ))

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})