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
    answer: 'var item = prompt("What do you need to buy?");\raddItem(item);'
    functions: ['addItem', 'prompt']
    reset: ['milk']
  }, {
    answer: 'var item = prompt("What do you need to buy?");\rif(item == null || item == ""){ //prompt returns null when the user hits cancel\r  alert("Please enter a value");\r} else {\r  addItem(item);\r}'
    functions: ['addItem', 'prompt', 'alert']
    reset: ['milk', 'eggs']
  }, {
    answer: '//removed the empty/null check for simplicity\rvar item = prompt("What do you need to buy?");\rif(itemExists(item) == true){\r alert("This item was already added");\r} else {\r  addItem(item);\r}'
    functions: ['addItem', 'prompt', 'alert', 'itemExists']
    reset: ['milk', 'eggs']
  }, {
    answer: 'function itemExists(item) {\r  var items = getItems();\r  for (var i = 0; i < items.length; i = i + 1) {\r    if (items[i] == item) {\r      return true;\r    }\r  }\r  return false;\r}\ralert(itemExists("milk"));'
    functions: ['alert', 'getItems']
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
    parameters: [['message - string', 'the message to display'], ['returns the value entered by the user']]
    define:
      prompt: (message) -> window.prompt(message)
  alert:
    display: "alert(message);"
    parameters: [['message - string', 'the message to display']]
    define:
      alert: (message) -> window.alert(message)
  itemExists:
    display: "itemExists(item);"
    parameters: [['item - string', 'the item to check'], ['returs true if the item exists, false otherwise']]
    define:
      itemExists: (item) ->
        for element in $('#items').children()
          return true if element.innerHTML.toLowerCase() == item
        return false
   getItems:
    display: "getItems();"
    parameters: [['returns a collection of the items in the list']]
    define:
      getItems: -> (element.innerHTML for element in $('#items').children())

Runner.config = config

$ ->
  $('textarea').on 'focus', Runner.focus
  $('a.run').on 'click', Runner.run
  $('a.answer').on 'click', Runner.answer
  $('a.reset').on 'click', Runner.reset
  Runner.shopList = $('#items')