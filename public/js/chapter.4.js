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
      var area, config;
      config = Runner.getConfig(this);
      area = Runner.getTextArea(this);
      Runner.setContext(config);
      Runner.ok(this);
      try {
        with(Runner.context) { eval(area.val()) };

        Runner.verify(config, this);
      } catch (error) {
        Runner.error(this, error.toString());
      }
      return e.preventDefault();
    };

    Runner.answer = function(e) {
      var area, config;
      config = Runner.getConfig(this);
      area = Runner.getTextArea(this);
      area.val(config.answer).focus();
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

    Runner.verify = function(config, element) {
      var index, item, items, _i, _len;
      items = (function() {
        var _i, _len, _ref, _results;
        _ref = Runner.shopList.children();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          _results.push($(item).text());
        }
        return _results;
      })();
      if (items.length !== config.expected.length) {
        return Runner.incorrect(element);
      }
      for (index = _i = 0, _len = items.length; _i < _len; index = ++_i) {
        item = items[index];
        if (item.toLowerCase() !== config.expected[index].toLowerCase()) {
          return Runner.incorrect(element);
        }
      }
      return Runner.correct(element);
    };

    Runner.getConfig = function(element) {
      return this.config.steps[Runner.getCodingArea(element).data('id')];
    };

    Runner.getTextArea = function(element) {
      return Runner.getCodingArea(element).find('textarea');
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

    Runner.incorrect = function(element) {
      return Runner.getCodingArea(element).find('.goal').addClass('incorrect').removeClass('correct');
    };

    Runner.correct = function(element) {
      return Runner.getCodingArea(element).find('.goal').addClass('correct').removeClass('incorrect');
    };

    return Runner;

  })();

  config = {};

  config.steps = [
    {
      answer: 'addItem("milk");',
      functions: ['addItem'],
      expected: ['milk'],
      reset: []
    }
  ];

  config.functions = {
    addItem: {
      display: "addItem(item);",
      description: 'Add an item to the shopping list',
      parameters: [['item - string', 'the item to add to the list']],
      define: {
        addItem: function(item) {
          return $('#items').append($('<div>').text(item));
        }
      }
    }
  };

  Runner.config = config;

  $(function() {
    $('textarea').on('focus', Runner.focus);
    $('.run').on('click', Runner.run);
    $('.answer').on('click', Runner.answer);
    $('.reset').on('click', Runner.reset);
    return Runner.shopList = $('#items');
  });

}).call(this);
