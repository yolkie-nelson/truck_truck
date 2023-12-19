from django.urls import path
from .views import api_list_appointments, api_list_technicians, api_show_appointment, api_show_technician, update_appointment_status

urlpatterns = [
    path('technicians/', api_list_technicians, name='api_list_technicians'),
    path('technicians/<int:id>/', api_show_technician, name='api_show_technician'),
    path('appointments/', api_list_appointments, name='api_list_appointments'),
    path('appointments/<int:id>/', api_show_appointment, name='api_show_appointment'),
    path('appointments/<int:id>/<str:action>/', update_appointment_status, name='update_appointment_status'),
]
