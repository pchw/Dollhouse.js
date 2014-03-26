
do (global = @, Marionette, Backbone, _)->
  #
  # caml2snake("PuppetCompositeView", 2)
  # -> "puppet"
  caml2snake = (camlStr, syslen)->
    parts = camlStr.replace(/([A-Z][^A-Z]+)/g, "$1/").split('/')
    parts = parts[0..parts.length-2-syslen]
    parts = parts.map (x)-> do x.toLowerCase
    parts = parts.join '_'
    parts

  Dollhouse = exports? and exports or global.Dollhouse = {}

  class Dollhouse.CompositeView extends Marionette.CompositeView
    capital_slug: ->
      "#{@slug.charAt(0).toUpperCase()}#{@slug.slice(1)}"
    initialize: ->
      @slug = caml2snake(@constructor.name, ['Composite', 'View'].length)
      @collection = new global["#{do @capital_slug}Collection"]
      do @collection.fetch

    getTemplate: ->
      "#{@slug}_composite_view_tmpl"
    itemView: -> global["#{do @capital_slug}RowView"]

  class Dollhouse.RowView extends Marionette.ItemView
    capital_slug: ->
      "#{@slug.charAt(0).toUpperCase()}#{@slug.slice(1)}"
    initialize: ->
      @slug = caml2snake(@constructor.name, ['Item', 'View'].length)

    getTemplate: ->
      "#{@slug}_row_view_tmpl"

  class Dollhouse.ItemView extends Marionette.ItemView
    namespace: ''
    capital_slug: ->
      "#{@slug.charAt(0).toUpperCase()}#{@slug.slice(1)}"
    initialize: ->
      @slug = caml2snake(@constructor.name, ['Item', 'View'].length)
      if @namespace
        @model = new global["#{@namespace}"]?["#{do @capital_slug}Model"]
      else
        @model = new global["#{do @capital_slug}Model"]
      do @model.fetch

    getTemplate: ->
      "#{@slug}_item_view_tmpl"
