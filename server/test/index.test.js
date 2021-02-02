const { expect } = require('chai')
const server = require('../')(3000)

describe('server', () => {
  before(() => server.start())
  after(() => server.stop())

  it('...', () => {
    // TODO: write first tests
  })
})