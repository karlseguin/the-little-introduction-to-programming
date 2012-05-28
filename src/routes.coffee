Store = require('./store');

class Routes
  @routes: (app) ->
    app.get '/chapter/:chapter/:name', (req, res) ->
      res.render "chapters/#{req.params.chapter}", {layout: 'layouts/book', locals: {chapter: parseInt(req.params.chapter)}}

    app.get '/', (req, res) ->
      res.render 'index', layout: 'layouts/home'

    app.post '/subscribe', (req, res) ->
      Store.subscribe req.body.email, (err) ->
        res.render 'subscribe', { layout: 'layouts/home', locals: {ok: !err?}}

    app.get '/unsubscribe', (req, res) ->
      res.render 'unsubscribe', { layout: 'layouts/home', locals: {email: req.query.email || ''}}

    app.post '/unsubscribe', (req, res) ->
      Store.unsubscribe req.body.email, (err) ->
        res.render 'unsubscribed', { layout: 'layouts/home', locals: {ok: !err?}}


module.exports = Routes.routes