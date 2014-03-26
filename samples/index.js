(function() {
  var Hoge,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Backbone.Marionette.ItemView.prototype.render = function() {
    var $newEl, data, html, template;
    this.isClosed = false;
    this.triggerMethod("before:render", this);
    this.triggerMethod("item:before:render", this);
    data = this.serializeData();
    data = this.mixinTemplateHelpers(data);
    template = this.getTemplate();
    html = Marionette.Renderer.render(template, data);
    $newEl = $(html);
    this.$el.replaceWith($newEl);
    this.setElement($newEl);
    this.bindUIElements();
    this.triggerMethod("render", this);
    this.triggerMethod("item:rendered", this);
    return this;
  };

  Backbone.Marionette.Renderer.render = function(template, data) {
    return ich[template](data);
  };

  Hoge = (typeof exports !== "undefined" && exports !== null) && exports || (this.Hoge = {});

  Hoge.TableModel = (function(_super) {
    __extends(TableModel, _super);

    function TableModel() {
      return TableModel.__super__.constructor.apply(this, arguments);
    }

    TableModel.prototype.url = function() {
      return "./data.json";
    };

    return TableModel;

  })(Backbone.Model);

  Hoge.TableItemView = (function(_super) {
    __extends(TableItemView, _super);

    function TableItemView() {
      return TableItemView.__super__.constructor.apply(this, arguments);
    }

    TableItemView.prototype.namespace = 'Hoge';

    return TableItemView;

  })(Dollhouse.ItemView);

  $(function() {
    var v;
    v = new Hoge.TableItemView;
    v.render();
    return $('body').append(v.el);
  });

}).call(this);
