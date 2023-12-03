from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('create_folder/', view=views.create_folder, name="create_folder"),
    path('folders/', view=views.folders, name="folders"),
    # path("folder/<int:id>/", views.display_destination, name="display destination")
]