from django.urls import include, path

from . import views

urlpatterns = [
        path('checkIntegration/', views.saveTodo, name = 'checkIntegration'),
        path('saveTodo/', views.saveTodo, name = 'saveTodo'),
        path('sendContent/<int:id>', views.sendContent, name = 'sendContent'),
        path('sendTodos/', views.sendTodos, name = 'sendTodos'),
        path('deleteContent/<int:id>', views.deleteContent, name = 'deleteContent'),
        path('modifyContent/<int:id>', views.modifyContent, name = 'modifyContent'),
        path('sendMonth/', views.sendMonth, name = 'sendMonth'),
        ]
