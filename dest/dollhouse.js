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
        return "" + (this.slug.charAt(0).toUpperCase()) + (this.slug.slice(1));
      };

      CompositeView.prototype.initialize = function() {
        this.slug = caml2snake(this.constructor.name, ['Composite', 'View'].length);
        this.collection = new global["" + (this.capital_slug()) + "Collection"];
        return this.collection.fetch();
      };

      CompositeView.prototype.getTemplate = function() {
        return "" + this.slug + "_composite_view_tmpl";
      };

      CompositeView.prototype.itemView = function() {
        return global["" + (this.capital_slug()) + "RowView"];
      };

      return CompositeView;

    })(Marionette.CompositeView);
    Dollhouse.RowView = (function(_super) {
      __extends(RowView, _super);

      function RowView() {
        return RowView.__super__.constructor.apply(this, arguments);
      }

      RowView.prototype.capital_slug = function() {
        return "" + (this.slug.charAt(0).toUpperCase()) + (this.slug.slice(1));
      };

      RowView.prototype.initialize = function() {
        return this.slug = caml2snake(this.constructor.name, ['Item', 'View'].length);
      };

      RowView.prototype.getTemplate = function() {
        return "" + this.slug + "_row_view_tmpl";
      };

      return RowView;

    })(Marionette.ItemView);
    return Dollhouse.ItemView = (function(_super) {
      __extends(ItemView, _super);

      function ItemView() {
        return ItemView.__super__.constructor.apply(this, arguments);
      }

      ItemView.prototype.namespace = '';

      ItemView.prototype.capital_slug = function() {
        return "" + (this.slug.charAt(0).toUpperCase()) + (this.slug.slice(1));
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
  })(this, Marionette, Backbone, _);

}).call(this);
