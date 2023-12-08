from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('folders/', view=views.folders, name="folders"),
    path('files/<int:id>/', view=views.files, name="files"),
    path('api/upload/', view=views.file_upload, name='file_upload'),
    path('api/download/<int:file_id>/', view=views.file_download, name='file_download'),
    # path("folder/<int:id>/", views.display_folder, name="display_destination")
]