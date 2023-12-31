from django.shortcuts import render, get_object_or_404, redirect
from django.conf  import settings
import json
import os
from django.contrib.auth.decorators import login_required
from core.models import Folder, File
from django.forms import model_to_dict
from django.http import JsonResponse
from django.http import FileResponse
from mimetypes import guess_type
from rest_framework.decorators import api_view
from rest_framework.response import Response


# Load manifest when server launches
MANIFEST = {}
if not settings.DEBUG:
    f = open(f"{settings.BASE_DIR}/core/static/manifest.json")
    MANIFEST = json.load(f)

# Create your views here.
@login_required
def index(req):
    context = {
        "asset_url": os.environ.get("ASSET_URL", ""),
        "debug": settings.DEBUG,
        "manifest": MANIFEST,
        "js_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["file"],
        "css_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["css"][0]
    }
    return render(req, "core/index.html", context)

@login_required
def folders(req):
    if req.method == "POST":
        body = json.loads(req.body)
        folder = Folder(
            title=body["title"],
            user=req.user
        )
        folder.save()
        return JsonResponse({ "folder": model_to_dict(folder) })
    else:
        user_folders = Folder.objects.filter(user=req.user)
        folder_dicts = [model_to_dict(folder) for folder in user_folders]
        return JsonResponse({ "folders": folder_dicts })
    

@login_required
def files(req, id):
    try:
        folder = Folder.objects.get(id=id)
        files = folder.files.all()
    except:
        files = File.objects.filter(user=req.user)
    file_dicts = [{"name": file.file_name, "id": file.id} for file in files]
    return JsonResponse({ "files": file_dicts })


# Most of this code was made with help from ChatGPT
@api_view(['POST'])
def file_upload(req, folder_id):
    file = req.FILES.get('file')

    if not req.user:
        return redirect("/sign_in")
    
    if not file:
        return Response({'error': 'Please attach a file'}, status=400)
    
    folder = None
    if folder_id:
        folder = Folder.objects.get(id=folder_id)

    # Save the file to the model 
    file = File(
        file = file,
        user = req.user,
        file_name = file.name,
        folder = folder
        )
    file.save()

    return Response({'message': 'File uploaded successfully'})

# Most of this code was made with help from ChatGPT
@login_required
def file_download(request, file_id):
    file = get_object_or_404(File, id=file_id)
    file_path = file.file.path

    content_type, encoding = guess_type(file_path)

    response = FileResponse(open(file_path, 'rb'), content_type=content_type)
    response['Content-Disposition'] = f'attachment; filename="{file.file.name}"'

    return response