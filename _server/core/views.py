from django.shortcuts import render
from django.conf  import settings
import json
import os
from django.contrib.auth.decorators import login_required
from core.models import Folder
from django.forms import model_to_dict

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
def create_folder(req):
    body = json.loads(req.body)
    note = Note(
        title=body["title"],
        content=body["content"],
        user=req.user
    )
    note.save()
    return JsonResponse({ "note": model_to_dict(note) })

@login_required
def folders(req):
    if req.method == "POST":
        body = json.loads(req.body)
        note = Note(
            title=body["title"],
            content=body["content"],
            user=req.user
        )
        note.save()
        return JsonResponse({ "note": model_to_dict(note) })
    else:
        return JsonResponse({ "folders": model_to_dict(req.user.folders) })