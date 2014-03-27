(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function(global, Marionette, Backbone, _) {
    var Dollhouse, caml2snake;
    caml2snake = function(camlStr, syslen) {
      var parts;
      parts = camlStr.replace(/([A-Z][^A-Z]+)/g, "$1/").split('/');
      parts = parts.slice(0, +(parts.length - 2 - syslen) + 1 || 9e9);
      parts = parts.map(function(x) {
        return x.toLowerCase();
      });
      parts = parts.join('_');
      return parts;
    };
    Dollhouse = (typeof exports !== "undefined" && exports !== null) && exports || (global.Dollhouse = {});
    Dollhouse.CompositeView = (function(_super) {
      __extends(CompositeView, _super);

      function CompositeView() {
        return CompositeView.__super__.constructor.apply(this, arguments);
      }

      CompositeView.prototype.capital_slug = function() {
        var s, slugs;
        slugs = this.slug.split('_');
        return ((function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = slugs.length; _i < _len; _i++) {
            s = slugs[_i];
            _results.push("" + (s.charAt(0).toUpperCase()) + (s.slice(1)));
          }
          return _results;
        })()).join('');
      };

      CompositeView.prototype.initialize = function() {
        var _ref;
        this.slug = caml2snake(this.constructor.name, ['Composite', 'View'].length);
        if (this.namespace) {
          this.collection = new ((_ref = global["" + this.namespace]) != null ? _ref["" + (this.capital_slug()) + "Collection"] : void 0);
        } else {
          this.collection = new global["" + (this.capital_slug()) + "Collection"];
        }
        return this.collection.fetch();
      };

      CompositeView.prototype.getTemplate = function() {
        return "" + this.slug + "_composite_view_tmpl";
      };

      CompositeView.prototype.getItemView = function() {
        var _ref;
        if (this.namespace) {
          return (_ref = global["" + this.namespace]) != null ? _ref["" + (this.capital_slug()) + "RowView"] : void 0;
        } else {
          return global["" + (this.capital_slug()) + "RowView"];
        }
      };

      return CompositeView;

    })(Marionette.CompositeView);
    Dollhouse.RowView = (function(_super) {
      __extends(RowView, _super);

      function RowView() {
        return RowView.__super__.constructor.apply(this, arguments);
      }

      RowView.prototype.capital_slug = function() {
        var s, slugs;
        slugs = this.slug.split('_');
        return ((function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = slugs.length; _i < _len; _i++) {
            s = slugs[_i];
            _results.push("" + (s.charAt(0).toUpperCase()) + (s.slice(1)));
          }
          return _results;
        })()).join('');
      };

      RowView.prototype.initialize = function() {
        return this.slug = caml2snake(this.constructor.name, ['Item', 'View'].length);
      };

      RowView.prototype.getTemplate = function() {
        return "" + this.slug + "_row_view_tmpl";
      };

      return RowView;

    })(Marionette.ItemView);
    Dollhouse.ItemView = (function(_super) {
      __extends(ItemView, _super);

      function ItemView() {
        return ItemView.__super__.constructor.apply(this, arguments);
      }

      ItemView.prototype.namespace = '';

      ItemView.prototype.capital_slug = function() {
        var s, slugs;
        slugs = this.slug.split('_');
        return ((function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = slugs.length; _i < _len; _i++) {
            s = slugs[_i];
            _results.push("" + (s.charAt(0).toUpperCase()) + (s.slice(1)));
          }
          return _results;
        })()).join('');
      };

      ItemView.prototype.initialize = function() {
        var _ref;
        this.slug = caml2snake(this.constructor.name, ['Item', 'View'].length);
        if (this.namespace) {
          this.model = new ((_ref = global["" + this.namespace]) != null ? _ref["" + (this.capital_slug()) + "Model"] : void 0);
        } else {
          this.model = new global["" + (this.capital_slug()) + "Model"];
        }
        return this.model.fetch();
      };

      ItemView.prototype.getTemplate = function() {
        return "" + this.slug + "_item_view_tmpl";
      };

      return ItemView;

    })(Marionette.ItemView);
    return Dollhouse.View = (function(_super) {
      __extends(View, _super);

      function View() {
        return View.__super__.constructor.apply(this, arguments);
      }

      View.prototype.namespace = '';

      View.prototype.capital_slug = function() {
        var s, slugs;
        slugs = this.slug.split('_');
        return ((function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = slugs.length; _i < _len; _i++) {
            s = slugs[_i];
            _results.push("" + (s.charAt(0).toUpperCase()) + (s.slice(1)));
          }
          return _results;
        })()).join('');
      };

      View.prototype.initialize = function() {
        return this.slug = caml2snake(this.constructor.name, ['View'].length);
      };

      View.prototype.getTemplate = function() {
        return "" + this.slug + "_view_tmpl";
      };

      return View;

    })(Marionette.ItemView);
  })(this, Marionette, Backbone, _);

}).call(this);
