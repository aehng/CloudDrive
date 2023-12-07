from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('folders/', view=views.folders, name="folders"),
    path('api/upload/', view=views.file_upload, name='file-upload'),
    path('api/download/<int:file_id>/', view=views.file_download, name='file-download'),
    # path("folder/<int:id>/", views.display_destination, name="display destination")
]