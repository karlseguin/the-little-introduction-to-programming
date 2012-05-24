class Routes
  @routes: (app) ->
    app.set('view options', { layout: 'layouts/main' })
    app.get '/chapter/:chapter/:name', (req, res) ->
      res.render "chapters/#{req.params.chapter}"

    app.get '/', (req, res) ->
      res.render 'index', layout: 'layouts/home'

module.exports = Routes.routes