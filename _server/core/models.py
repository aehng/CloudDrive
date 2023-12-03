from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Folder(models.Model):
    name = models.TextField()
    parent_folder = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="folders")