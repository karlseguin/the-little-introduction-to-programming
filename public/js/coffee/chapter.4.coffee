_.templateSettings =
  interpolate: /\{\{(.+?)\}\}/g,
  evaluate: /\{%(.+?)%\}/g

class Runner
  @functionTemplate: _.template($('#functionTemplate').html())
  @run: (e) ->
    config = Runner.getConfig(this)
    input = Runner.getInput(this, '.input')
    Runner.setContext(config)
    Runner.ok(this)
    try
      `with(Runner.context) { eval(input.val()) }`
    catch error
      Runner.error(this, error.toString())
    e.preventDefault()

  @answer: (e) ->
    config = Runner.getConfig(this)
    Runner.getInput(this, '.answer').toggle().text(config.answer);
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

  @getConfig: (element) ->
    @config.steps[Runner.getCodingArea(element).data('id')]

  @getInput: (element, type) ->
    Runner.getCodingArea(element).find('textarea').filter(type)

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

config = {}
config.steps = [
  {
    answer: 'addItem("milk");'
    functions: ['addItem']
    reset: []
  }, {
    answer: 'var item = prompt("What do you need to buy?");\naddItem(item);'
    functions: ['addItem', 'prompt']
    reset: ['milk']
  }, {
    answer: 'var item = prompt("What do you need to buy?");\nif(item == ""){\n  alert("Please enter a value");\n} else {\n  addItem(item);\n}'
    functions: ['addItem', 'prompt', 'alert']
    reset: ['milk', 'eggs']
  }
]

config.functions =
  addItem:
    display: "addItem(item);"
    parameters: [['item - string', 'the item to add to the list']]
    define:
      addItem: (item) -> $('#items').append($('<div>').text(item))
  prompt:
    display: "prompt(message);"
    parameters: [['message - string', 'the message to display'], ['return - string', 'the value entered by the user']]
    define:
      prompt: (message) -> window.prompt(message)
  alert:
    display: "alert(message);"
    parameters: [['message - string', 'the message to display']]
    define:
      alert: (message) -> window.alert(message)

Runner.config = config

$ ->
  $('textarea').on 'focus', Runner.focus
  $('a.run').on 'click', Runner.run
  $('a.answer').on 'click', Runner.answer
  $('a.reset').on 'click', Runner.reset
  Runner.shopList = $('#items')