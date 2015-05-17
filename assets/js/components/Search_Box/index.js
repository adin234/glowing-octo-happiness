'use strict';

define(function() {

  return function Search_Box(opts) {

    var defaults = {
      onSelect: function() {},
      onResetInput: function() {}
    },
    selected = '',
    onSelectHook = function(item) {
      selected = item.value;
      optsOnSelect(item);
    },
    options = $.extend({}, defaults, opts),
    optsOnSelect = function() {};

    return {
      $el: null,

      init: function(items) {
        options.lookup = items;

        return this;
      },

      get_active: function() {
        return selected; 
      },

      reset: function() {
        this.$el.val('');
        selected = '';
      },

      applyTo: function($el) {
        this.$el = $el;
        //hook into the select cb to we can set selected item
        optsOnSelect = options.onSelect;
        options.onSelect = onSelectHook;

        this.$el
        .autocomplete(options);

        this.$el.on('keyup', function () {
          if ($(this).val() === '') {
            options.onResetInput();
            selected = '';
          }
        });

        return this;
      }
    };
  };

});
