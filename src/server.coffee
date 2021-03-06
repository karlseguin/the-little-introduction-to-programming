express = require('express')
store = require('./store')

run = (config) ->
  store.initialize config.redis, (err) ->
    if err?
      console.log('store initialization error: %s', err)
      process.exit(1)

    require('./config')(config)

    app = module.exports = express.createServer()
    app.configure ->
      app.set('views', __dirname + '/../views')
      app.set('view engine', 'ejs')
      app.use(express.bodyParser())
      app.use(app.router)
      if app.settings.env == 'development'
        app.use(express.static(__dirname + '/../public/'));

    require('./routes')(app)
    require('./helpers')(app, config)
    app.listen(config.site.port)

module.exports = run