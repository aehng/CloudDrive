from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('folders/', view=views.folders, name="folders"),
    # path("folder/<int:id>/", views.display_destination, name="display destination")
]