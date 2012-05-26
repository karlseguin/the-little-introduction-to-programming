redis = require('redis')

class Store
  @client = null

  @initialize: (config, callback) ->
    @client = redis.createClient(config.port, config.host, {return_buffers: true})
    @client.select(config.database, callback)

  @subscribe: (email, cb) =>
    @client.sadd('ci:subscriptions', email, cb)

module.exports = Store