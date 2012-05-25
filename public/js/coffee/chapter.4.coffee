_.templateSettings =
  interpolate: /\{\{(.+?)\}\}/g,
  evaluate: /\{%(.+?)%\}/g

class Runner
  @functionTemplate: _.template($('#functionTemplate').html())
  @run: (e) ->
    config = Runner.getConfig(this)
    area = Runner.getTextArea(this)
    Runner.setContext(config)
    Runner.ok(this)
    try
      `with(Runner.context) { eval(area.val()) }`
      Runner.verify(config, this)
    catch error
      Runner.error(this, error.toString())
    e.preventDefault()

  @answer: (e) ->
    config = Runner.getConfig(this)
    area = Runner.getTextArea(this)
    area.val(config.answer).focus()
    e.preventDefault()

  @reset: (e) ->
    config = Runner.getConfig(this)
    list = Runner.shopList.empty()
    Runner.getCodingArea(this).find('.goal').removeClass('incorrect correct')
    for item in config.reset
      list.append($('<div>').text(item))
    e.preventDefault()

  @focus: ->
    config = Runner.getConfig(this)
    $list = $('#funcList').show().children('div:first').empty()
    for f in config.functions
      $list.append(Runner.functionTemplate(Runner.getFunction(f)))

  @setContext: (config) ->
    Runner.context = {};
    for n in config.functions
      for name, func of Runner.getFunction(n).define
        Runner.context[name] = func

  @verify: (config, element) ->
    items = ($(item).text() for item in Runner.shopList.children())
    if items.length != config.expected.length
      return Runner.incorrect(element)
    for item, index in items
      return Runner.incorrect(element) if item.toLowerCase() != config.expected[index].toLowerCase()
    Runner.correct(element)

  @getConfig: (element) ->
    @config.steps[Runner.getCodingArea(element).data('id')]

  @getTextArea: (element) ->
    Runner.getCodingArea(element).find('textarea')

  @getCodingArea: (element) ->
    $(element).closest('.codingArea')

  @getFunction: (f) ->
    @config.functions[f]

  @ok: (element) ->
    Runner.getCodingArea(element).removeClass('error')
    Runner.shopList.removeClass('error').find('.error').remove()
    Runner.shopList.siblings('h4').show()

  @error: (element, error) ->
    Runner.getCodingArea(element).addClass('error')
    Runner.shopList.addClass('error').append($('<div class="error">').text(error)).siblings('h4').hide()

  @incorrect: (element) ->
    Runner.getCodingArea(element).find('.goal').addClass('incorrect').removeClass('correct')

  @correct: (element) ->
    Runner.getCodingArea(element).find('.goal').addClass('correct').removeClass('incorrect')

config = {}
config.steps = [
  answer: 'addItem("milk");'
  functions: ['addItem']
  expected: ['milk']
  reset: []
]

config.functions =
  addItem:
    display: "addItem(item);"
    description: 'Add an item to the shopping list'
    parameters: [['item - string', 'the item to add to the list']]
    define:
      addItem: (item) -> $('#items').append($('<div>').text(item))

Runner.config = config

$ ->
  $('textarea').on 'focus', Runner.focus
  $('.run').on 'click', Runner.run
  $('.answer').on 'click', Runner.answer
  $('.reset').on 'click', Runner.reset
  Runner.shopList = $('#items')