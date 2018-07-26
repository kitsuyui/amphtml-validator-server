const neodoc = require('neodoc')

const server = require('./src/server')

const main = async () => {
  const args = neodoc.run(
    `
Usage:
  fetcher [--help]
  fetcher server [--help] [--host=<host>] [--port=<port>]
Options:
  --host=<host>            [default: "localhost"]
  --port=<port>            [default: 8080]
`,
    { smartOptions: true }
  )
  await server.main(args['--host'], args['--port'])
}

if (require.main === module) {
  main()
}
