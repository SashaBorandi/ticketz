from django.conf.urls import patterns, url

import api.ticket.views as views

urlpatterns = patterns('',
    url(r'^purchase$', views.PurchaseView.as_view(), name="api_ticket_purchase"),
    url(r'^list$', views.ListView.as_view(), name="api_ticket_list"),
    url(r'^verify$', views.VerifyView.as_view(), name="api_ticket_verify"),
    url(r'^refund$', views.RefundView.as_view(), name="api_ticket_refund"),
)
