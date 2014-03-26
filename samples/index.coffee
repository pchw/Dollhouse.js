Backbone.Marionette.ItemView::render = ->
  @isClosed = false
  @triggerMethod "before:render", this
  @triggerMethod "item:before:render", this
  data = do @serializeData
  data = @mixinTemplateHelpers data
  template = do @getTemplate
  html = Marionette.Renderer.render template, data

  $newEl = $ html
  @$el.replaceWith $newEl
  @setElement $newEl

  do @bindUIElements
  @triggerMethod "render", this
  @triggerMethod "item:rendered", this
  this

Backbone.Marionette.Renderer.render = (template, data)->
  return ich[template](data)

Hoge = exports? and exports or @Hoge = {}

class Hoge.TableModel extends Backbone.Model
  url: ->
    "./data.json"

class Hoge.TableItemView extends Dollhouse.ItemView
  namespace: 'Hoge'

$ ->
  v = new Hoge.TableItemView
  do v.render
  $('body').append(v.el)
