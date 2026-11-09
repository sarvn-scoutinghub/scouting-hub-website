import base64, json, os, pathlib, sys, urllib.request

GW = "https://connector-gateway.lovable.dev/github"
H = {
    "Accept": "application/vnd.github+json",
    "Authorization": f"Bearer {os.environ['LOVABLE_API_KEY']}",
    "X-Connection-Api-Key": os.environ['GITHUB_API_KEY'],
    "Content-Type": "application/json",
}
OWNER, REPO = "sarvn-scoutinghub", "scouting-hub-website"
ROOT = pathlib.Path("/tmp/gh-site")

def api(method, path, body=None):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(GW + path, data=data, headers=H, method=method)
    try:
        with urllib.request.urlopen(req) as r:
            return r.status, json.loads(r.read() or b"{}")
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read() or b"{}")

# 1. create repo (public so GitHub Pages works on the free plan)
s, r = api("POST", "/user/repos", {"name": REPO, "private": False, "auto_init": True,
                                   "description": "Scouting Hub website - skilled workers in Europe"})
if s == 422:
    print("repo already exists, reusing it")
elif s not in (200, 201):
    print("repo create failed:", s, r); sys.exit(1)
else:
    print("repo created:", r.get("html_url"))

# 2. upload every file as a blob
files = [p for p in ROOT.rglob("*") if p.is_file()]
tree_entries = []
for p in sorted(files):
    rel = p.relative_to(ROOT).as_posix()
    b64 = base64.b64encode(p.read_bytes()).decode()
    s, r = api("POST", f"/repos/{OWNER}/{REPO}/git/blobs", {"content": b64, "encoding": "base64"})
    if s not in (200, 201):
        print("blob failed:", rel, s, r); sys.exit(1)
    tree_entries.append({"path": rel, "mode": "100644", "type": "blob", "sha": r["sha"]})
    print("blob ok:", rel)

# 3. base tree from current main
s, r = api("GET", f"/repos/{OWNER}/{REPO}/git/ref/heads/main")
base = r["object"]["sha"] if s == 200 else None
s, r = api("POST", f"/repos/{OWNER}/{REPO}/git/trees",
           {"base_tree": base, "tree": tree_entries} if base else {"tree": tree_entries})
if s not in (200, 201):
    print("tree failed:", s, r); sys.exit(1)
tree_sha = r["sha"]

# 4. commit + move main
s, r = api("POST", f"/repos/{OWNER}/{REPO}/git/commits",
           {"message": "Upload Scouting Hub website", "tree": tree_sha,
            "parents": [base] if base else []})
commit_sha = r["sha"]
if base:
    s, r = api("PATCH", f"/repos/{OWNER}/{REPO}/git/refs/heads/main", {"sha": commit_sha})
else:
    s, r = api("POST", f"/repos/{OWNER}/{REPO}/git/refs", {"ref": "refs/heads/main", "sha": commit_sha})
print("commit pushed:", commit_sha[:8])

# 5. enable GitHub Pages from main /
s, r = api("POST", f"/repos/{OWNER}/{REPO}/pages", {"source": {"branch": "main", "path": "/"}})
print("pages:", s, r.get("html_url") or r.get("message"))
print("REPO_URL=https://github.com/%s/%s" % (OWNER, REPO))
print("SITE_URL=https://%s.github.io/%s/" % (OWNER, REPO))
