# amphtml-validator-server

![CircleCI](https://img.shields.io/circleci/project/github/kitsuyui/amphtml-validator-server.svg)
[![Docker Pulls](https://img.shields.io/docker/pulls/kitsuyui/amphtml-validator-server.svg)](https://hub.docker.com/r/kitsuyui/amphtml-validator-server/)
[![npm](https://img.shields.io/npm/dt/amphtml-validator-server.svg)](https://www.npmjs.com/package/amphtml-validator-server)

Web API of [amphtml-validator](https://www.npmjs.com/package/amphtml-validator)

# Usage

```console
$ docker run -p 8080:8080 -it kitsuyui/amphtml-validator-server
```

## Valid AMP page

```console
$ curl -D - http://localhost:8080/https://www.ampproject.org/
HTTP/1.1 200 OK
Content-Type: application/json

{
    "status": "PASS",
    "errors": []
}
```

## Non-valid AMP page

```console
$ curl -D - http://localhost:8080/https://example.com/
HTTP/1.1 502 Bad Gateway
Content-Type: application/json

{
    "status": "FAIL",
    "errors": [
        {
            "severity": "ERROR",
            "line": 2,
            "col": 0,
            "message": "The mandatory attribute '⚡' is missing in tag 'html ⚡ for top-level html'.",
            "specUrl": "https://www.ampproject.org/docs/reference/spec#required-markup",
            "category": "MANDATORY_AMP_TAG_MISSING_OR_INCORRECT",
            "code": "MANDATORY_ATTR_MISSING",
            "params": [
...
```

# As NPM package

## yarn

```console
$ yarn add amphtml-validator-server
```

## npm

```console
$ npm install amphtml-validator-server
```

## Usage

```js
const amphtmlValidatorServer = require('amphtml-validator-server');
const server = amphtmlValidatorServer.createServer();
server.listen();
```

# LICENSE

MIT. See Also LICENSE file.
