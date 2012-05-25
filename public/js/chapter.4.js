// Generated by CoffeeScript 1.3.2
(function() {
  var Runner, config;

  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g,
    evaluate: /\{%(.+?)%\}/g
  };

  Runner = (function() {

    function Runner() {}

    Runner.functionTemplate = _.template($('#functionTemplate').html());

    Runner.run = function(e) {
      var config, input;
      config = Runner.getConfig(this);
      input = Runner.getInput(this, '.input');
      Runner.setContext(config);
      Runner.ok(this);
      try {
        with(Runner.context) { eval(input.val()) };

      } catch (error) {
        Runner.error(this, error.toString());
      }
      return e.preventDefault();
    };

    Runner.answer = function(e) {
      var config;
      config = Runner.getConfig(this);
      Runner.getInput(this, '.answer').toggle().text(config.answer);
      return e.preventDefault();
    };

    Runner.reset = function(e) {
      var config, item, list, _i, _len, _ref;
      config = Runner.getConfig(this);
      list = Runner.shopList.empty();
      Runner.getCodingArea(this).find('.goal').removeClass('incorrect correct');
      _ref = config.reset;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        list.append($('<div>').text(item));
      }
      return e.preventDefault();
    };

    Runner.focus = function() {
      var $list, config, f, _i, _len, _ref, _results;
      config = Runner.getConfig(this);
      $list = $('#funcList').show().children('div:first').empty();
      _ref = config.functions;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        f = _ref[_i];
        _results.push($list.append(Runner.functionTemplate(Runner.getFunction(f))));
      }
      return _results;
    };

    Runner.setContext = function(config) {
      var func, n, name, _i, _len, _ref, _results;
      Runner.context = {};
      _ref = config.functions;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        n = _ref[_i];
        _results.push((function() {
          var _ref1, _results1;
          _ref1 = Runner.getFunction(n).define;
          _results1 = [];
          for (name in _ref1) {
            func = _ref1[name];
            _results1.push(Runner.context[name] = func);
          }
          return _results1;
        })());
      }
      return _results;
    };

    Runner.getConfig = function(element) {
      return this.config.steps[Runner.getCodingArea(element).data('id')];
    };

    Runner.getInput = function(element, type) {
      return Runner.getCodingArea(element).find('textarea').filter(type);
    };

    Runner.getCodingArea = function(element) {
      return $(element).closest('.codingArea');
    };

    Runner.getFunction = function(f) {
      return this.config.functions[f];
    };

    Runner.ok = function(element) {
      Runner.getCodingArea(element).removeClass('error');
      Runner.shopList.removeClass('error').find('.error').remove();
      return Runner.shopList.siblings('h4').show();
    };

    Runner.error = function(element, error) {
      Runner.getCodingArea(element).addClass('error');
      return Runner.shopList.addClass('error').append($('<div class="error">').text(error)).siblings('h4').hide();
    };

    return Runner;

  })();

  config = {};

  config.steps = [
    {
      answer: 'addItem("milk");',
      functions: ['addItem'],
      reset: []
    }, {
      answer: 'var item = prompt("What do you need to buy?");\raddItem(item);',
      functions: ['addItem', 'prompt'],
      reset: ['milk']
    }, {
      answer: 'var item = prompt("What do you need to buy?");\rif(item == null || item == ""){ //prompt returns null when the user hits cancel\r  alert("Please enter a value");\r} else {\r  addItem(item);\r}',
      functions: ['addItem', 'prompt', 'alert'],
      reset: ['milk', 'eggs']
    }, {
      answer: '//removed the empty/null check for simplicity\rvar item = prompt("What do you need to buy?");\rif(itemExists(item) == true){\r alert("This item was already added");\r} else {\r  addItem(item);\r}',
      functions: ['addItem', 'prompt', 'alert', 'itemExists'],
      reset: ['milk', 'eggs']
    }, {
      answer: 'function itemExists(item) {\r  var items = getItems();\r  for (var i = 0; i < items.length; i = i + 1) {\r    if (items[i] == item) {\r      return true;\r    }\r  }\r  return false;\r}\ralert(itemExists("milk"));',
      functions: ['alert', 'getItems'],
      reset: ['milk', 'eggs']
    }
  ];

  config.functions = {
    addItem: {
      display: "addItem(item);",
      parameters: [['item - string', 'the item to add to the list']],
      define: {
        addItem: function(item) {
          return $('#items').append($('<div>').text(item));
        }
      }
    },
    prompt: {
      display: "prompt(message);",
      parameters: [['message - string', 'the message to display'], ['return - string', 'the value entered by the user']],
      define: {
        prompt: function(message) {
          return window.prompt(message);
        }
      }
    },
    alert: {
      display: "alert(message);",
      parameters: [['message - string', 'the message to display']],
      define: {
        alert: function(message) {
          return window.alert(message);
        }
      }
    },
    itemExists: {
      display: "itemExists(item);",
      parameters: [['item - string', 'the item to check'], ['return - boolean', 'true if the item exists, false otherwise']],
      define: {
        itemExists: function(item) {
          var element, _i, _len, _ref;
          _ref = $('#items').children();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            element = _ref[_i];
            if (element.innerHTML.toLowerCase() === item) {
              return true;
            }
          }
          return false;
        }
      }
    },
    getItems: {
      display: "getItems();",
      parameters: [['return - string collection', 'the items currently in the list']],
      define: {
        getItems: function() {
          var element, _i, _len, _ref, _results;
          _ref = $('#items').children();
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            element = _ref[_i];
            _results.push(element.innerHTML);
          }
          return _results;
        }
      }
    }
  };

  Runner.config = config;

  $(function() {
    $('textarea').on('focus', Runner.focus);
    $('a.run').on('click', Runner.run);
    $('a.answer').on('click', Runner.answer);
    $('a.reset').on('click', Runner.reset);
    return Runner.shopList = $('#items');
  });

}).call(this);
