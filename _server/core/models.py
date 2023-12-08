from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Folder(models.Model):
    title = models.TextField()
    parent_folder = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="folders")

class File(models.Model):
    file = models.FileField(upload_to='uploads/')
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE, null=True, blank=True, related_name="files")
    file_name = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="files")