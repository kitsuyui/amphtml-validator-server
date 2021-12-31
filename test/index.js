const assert = require('assert')

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

const server = require('../src/server')

const testAMP = async (baseURL, url) => {
  const response = await fetch(baseURL + url)
  assert.strictEqual(response.status, 200)
  const resultJSON = JSON.parse(await response.text())
  assert.strictEqual(resultJSON.status, 'PASS')
  assert.strictEqual(resultJSON.errors.length, 0)
}

const testNonAMP = async (baseURL, url) => {
  const response = await fetch(baseURL + url)
  assert.strictEqual(response.status, 502)
  const resultJSON = JSON.parse(await response.text())
  assert.notStrictEqual(resultJSON.status, 'PASS')
  assert.notStrictEqual(resultJSON.errors.length, 0)
}

const main = async () => {
  const host = 'localhost'
  const port = 8000
  const testServer = server.createServer()
  testServer.listen(port, host)
  const baseURL = `http://${host}:${port}/`

  await testAMP(baseURL, 'https://preview.amp.dev/documentation/examples/introduction/hello_world')
  await testNonAMP(baseURL, 'https://example.com/')

  testServer.close()
}

if (require.main === module) {
  main()
}
