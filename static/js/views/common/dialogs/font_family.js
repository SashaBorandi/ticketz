define([
  'underscore'
  , 'backbone'
  , 'marionette'
  , 'views/common/dialogs/abstract'
], function(_, Backbone, Marionette, AbstractView){
  var View = AbstractView.extend({
    className: 'font-family-dialog',
    resizable: false,
    title: 'Pick font',

    dialogContent: function() {
      return this.model.buildControl({
        attribute: Marionette.getOption(this, 'attribute'),
        type: 'font_family'
      }).$el;
    }
  });

  return View;
});