redis = require('redis')

class Store
  @client = null

  @initialize: (config, callback) ->
    @client = redis.createClient(config.port, config.host, {return_buffers: true})
    @client.select(config.db, callback)

module.exports = Store