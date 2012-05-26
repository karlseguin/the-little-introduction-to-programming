class Routes
  @routes: (app) ->
    app.get '/chapter/:chapter/:name', (req, res) ->
      res.render "chapters/#{req.params.chapter}", {layout: 'layouts/book', locals: {chapter: parseInt(req.params.chapter)}}

    app.get '/_home', (req, res) ->
      res.render 'index', layout: 'layouts/home'

module.exports = Routes.routes