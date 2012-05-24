express = require('express')
store = require('./store')

run = (config) ->
  store.initialize config.redis, (err) ->
    if err?
      console.log('store initialization error: %s', err)
      process.exit(1)

    app = module.exports = express.createServer()
    app.configure ->
      app.set('views', __dirname + '/../views')
      app.set('view engine', 'ejs')
      app.use(express.bodyParser())
      app.use(app.router)
      app.use(require('connect-assets')())
      if app.settings.env == 'development'
        app.use(express.static(__dirname + '/../assets/'));

    require('./routes')(app)
    require('./helpers')(app, config)
    app.listen(config.site.port)

module.exports = run