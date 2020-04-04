const Axios = require('axios').default
const { expect } = require('chai')
const server = require('../server')

describe('server', () => {
  let axios
  let stop

  // start the server before running tests
  before(async () => {
    const { start} = server(0)
    const obj = await start()
    stop = obj.stop
    axios = Axios.create({ baseURL: 'http://localhost:' + obj.port })
  })

  // stop the server after running tests
  after(() => {
    stop()
  })

  it('can request /hello', async () => {
    const res = await axios.get('/hello')
    expect(res.data).to.equal('Hello, World!')
  })

})
