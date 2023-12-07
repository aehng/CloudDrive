from django.shortcuts import render, get_object_or_404
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
        print("This should be saved!")
        folder.save()
        return JsonResponse({ "folder": model_to_dict(folder) })
    else:
        return JsonResponse({ "folders": model_to_dict(req.user.folders) })
    


@api_view(['POST'])
def file_upload(req):
    file = req.FILES.get('file')

    # Perform any additional validation or processing here

    # Save the file to the model 
    file = File(
        file=file,
        user= req.user
        )
    file.save()

    return Response({'message': 'File uploaded successfully'})


def file_download(request, file_id):
    file = get_object_or_404(File, id=file_id)
    file_path = file.file.path

    content_type, encoding = guess_type(file_path)

    response = FileResponse(open(file_path, 'rb'), content_type=content_type)
    response['Content-Disposition'] = f'attachment; filename="{file.file.name}"'

    return response