#= require rainbow/rainbow.js
#= require rainbow/generic.js
#= require rainbow/html.js
#= require rainbow/ruby.js
#= require rainbow/javascript.js

$ ->
  if /chapter/.test(top.location.pathname)
    text = $('#menu').find("a[href=\"#{top.location.pathname}\"]").text()
    $('#toc').text(text)

  $('#toc').on 'click', (e) ->
    $('#menu').toggle()
    e.stopPropagation()

  $(document).on 'keydown', (e) ->
    $('#menu').hide() if e.keyCode == 27

  $(document).on 'click', -> $('#menu').hide()