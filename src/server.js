const http = require('http')

const accesslog = require('access-log')
const amphtmlValidator = require('amphtml-validator')
const fetch = require('node-fetch')

const getResult = async url => {
  const response = await fetch(url)
  const validator = await amphtmlValidator.getInstance()
  const body = await response.text()
  const result = validator.validateString(body)
  return result
}

const prefixes = ['http://', 'https://']

const createServer = () => {
  return http.createServer(async (req, res) => {
    const url = req.url.slice(1)
    accesslog(req, res)
    if (!prefixes.some(prefix => url.startsWith(prefix))) {
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      })
      res.end('Not Found')
    }
    const result = await getResult(url)
    const httpStatus = result.status === 'PASS' ? 200 : 502
    const resultJSON = JSON.stringify(result, null, 4)
    res.writeHead(httpStatus, {
      'Content-Type': 'application/json'
    })
    res.end(resultJSON)
  })
}

const main = async (host, port) => {
  await createServer().listen(port, host)
}

module.exports = { main, createServer }
