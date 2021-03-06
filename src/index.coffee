
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
      slugs = @slug.split '_'
      ("#{s.charAt(0).toUpperCase()}#{s.slice(1)}" for s in slugs).join ''
    initialize: (p)->
      @slug = caml2snake(@constructor.name, ['Composite', 'View'].length)
      if @namespace
        @collection = new global["#{@namespace}"]?["#{do @capital_slug}Collection"]
      else 
        @collection = new global["#{do @capital_slug}Collection"]

      p = {} unless p?
      p.fetch = true unless p.fetch?
      unless p.success
        p.success = (data, type)=>
          @trigger 'success', @,
            data: data
            type: type
      unless p.error
        p.error = (request, status, error)=>
          @trigger 'error', @,
            request: request
            status: status
            error: error
      unless p.complete
        p.complete = (request, status)=>
          @trigger 'complete', @, 
            request: request
            status: status
      unless p.fetch is false
        @collection.fetch
          success: p.success
          error: p.error
          complete: p.complete

    getTemplate: ->
      "#{@slug}_composite_view_tmpl"
    getItemView: ->
      if @namespace
        global["#{@namespace}"]?["#{do @capital_slug}RowView"]
      else
        global["#{do @capital_slug}RowView"]

  class Dollhouse.RowView extends Marionette.ItemView
    capital_slug: ->
      slugs = @slug.split '_'
      ("#{s.charAt(0).toUpperCase()}#{s.slice(1)}" for s in slugs).join ''
    initialize: ->
      @slug = caml2snake(@constructor.name, ['Item', 'View'].length)

    getTemplate: ->
      "#{@slug}_row_view_tmpl"

  class Dollhouse.ItemView extends Marionette.ItemView
    namespace: ''
    capital_slug: ->
      slugs = @slug.split '_'
      ("#{s.charAt(0).toUpperCase()}#{s.slice(1)}" for s in slugs).join ''

    initialize: (p)->
      @slug = caml2snake(@constructor.name, ['Item', 'View'].length)
      if @namespace
        @model = new global["#{@namespace}"]?["#{do @capital_slug}Model"]
      else
        @model = new global["#{do @capital_slug}Model"]

      p = {} unless p?
      p.fetch = true unless p.fetch?
      unless p.success
        p.success = (data, type)=>
          @trigger 'success', @,
            data: data
            type: type
      unless p.error
        p.error = (request, status, error)=>
          @trigger 'error', @,
            request: request
            status: status
            error: error
      unless p.complete
        p.complete = (request, status)=>
          @trigger 'complete', @, 
            request: request
            status: status
      unless p.fetch is false
        @collection.fetch
          success: p.success
          error: p.error
          complete: p.complete

    getTemplate: ->
      "#{@slug}_item_view_tmpl"

  class Dollhouse.View extends Marionette.ItemView
    namespace: ''
    capital_slug: ->
      slugs = @slug.split '_'
      ("#{s.charAt(0).toUpperCase()}#{s.slice(1)}" for s in slugs).join ''
    initialize: ->
      @slug = caml2snake(@constructor.name, ['View'].length)

    getTemplate: ->
      "#{@slug}_view_tmpl"
