define([
  'underscore'
  , 'marionette'
  , 'collections/tickets'
  , 'views/common/grid'
  , 'views/event_update/manage/ticket_grid_item'
  , 'vendors/jquery.flot.pie'
], function(_, Marionette, Tickets, GridView, TicketGridItemView){
  var View = Marionette.ItemView.extend({
    template: '#eu-manage-tab-template',

    serializeData: function() {
      return {
        model: this.model
      }
    },

    events: {
      'click .js-verify-ticket': 'onVerifyTicket'
    },

    ui: {
      ticketList: '.js-ticket-list',
      pieChart: '.js-pie-chart'
    },

    initialize: function() {
      this.tickets = new Tickets();
    },

    onRender: function() {
      this.loadTickets();
      this.loadChart(); 
    },

    loadTickets: function() {
      var self = this;
      var data = {
        event_id: this.model.id
      }

      this.tickets.list({
        data: data
      }).success(function(response){
        self.$('.js-count-sold-ticket').html(response.pagination.total);
        var gridView = new GridView({
          headers: [_.t('Code'), _.t('Event'), '&nbsp;'],
          itemView: TicketGridItemView,
          collection: self.tickets,
          pageRange: 9,
          data: data,
          className: 'table table-hover'
        });
        gridView.render();

        self.ui.ticketList.html(gridView.$el);
      });
    },

    onVerifyTicket: function(e) {
      var self = this;
      var $target = $(e.currentTarget);

      $target.bsbutton('loading');

      var code = this.$('.js-ticket-code').val();

      Backbone.callApi('post', 'ticket/verify', {code: code})
      .success(function(){
        var ticket = self.tickets.findWhere({code: code});
        if (ticket) {
          ticket.set('is_used', true);
        }
      })
      .complete(function(){
        $target.bsbutton('reset');  
      });
    },

    loadChart: function() {
      var self = this;

      var options = {
        series: {
          pie: {show: true}
        },
        legend: {
          show: false
        }
      };

      Backbone.callApi('get', 'event/report', {
        id: this.model.id
      }).success(function(response){
        var data = [];
        _.each(response.data, function(count, label){
          data.push({
            label: label,
            data: count
          });
          $.plot(self.ui.pieChart, data, options); 
        })
      });
      
    }
  });

  return View;
})
