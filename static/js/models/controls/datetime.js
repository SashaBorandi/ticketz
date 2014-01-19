define([
  'marionette'
  , 'models/controls/abstract'
  , 'moment'
  , 'vendors/jquery.ui.timepicker'
], function(Marionette, AbstractView, moment){
  var View = AbstractView.extend({
    template: function(data) {
      return '<input type="text" class="form-control" /><span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>';
    },

    defaultDate: '',
    placeholder: null,
    dateFormat: 'yy-mm-dd',
    timeFormat: 'HH:mm',

    onRender: function() {
      this.$el.addClass('input-group');
      var placeholder = Marionette.getOption(this, 'placeholder');
      if (placeholder) {
        this.$('input').attr('placeholder', placeholder);
      }      
      this.initDatetimePicker();
    },

    onChangeModelValue: function() {
      
    },

    initDatetimePicker: function() {
      var attribute = Marionette.getOption(this, 'attribute');
      var dateFormat = Marionette.getOption(this, 'dateFormat');
      var timeFormat = Marionette.getOption(this, 'timeFormat');

      var self = this;
      var initialDate = this.model.get(attribute) || Marionette.getOption(this, 'defaultDate') || new Date().getTime();
      initialDate = new Date(initialDate);

      var $input = this.$('input');

      $input.datetimepicker({
        dateFormat: dateFormat,
        timeFormat: timeFormat,
        defaultDate: initialDate,
        onSelect: function(dateTime) {
          var date = $(this).datetimepicker('getDate').getTime();
          self.model.set(attribute, date);
        }
      });

      $input.datetimepicker('setDate', initialDate);
    }
  });

  return View;
});