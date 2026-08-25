import subprocess
import time
import urllib.request
import json
import os
import sys

print("Starting Vite preview server...")
server = subprocess.Popen("npm run preview", shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, encoding='utf-8', errors='ignore')

port = 4173
server_ready = False
for i in range(15):
    time.sleep(1)
    try:
        req = urllib.request.Request(f"http://localhost:{port}", headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=2) as r:
            if r.status == 200:
                server_ready = True
                break
    except Exception:
        pass

if not server_ready:
    print("Vite preview server failed to start.")
    if os.name == 'nt':
        subprocess.run(f"taskkill /F /T /PID {server.pid}", shell=True, capture_output=True)
    else:
        server.terminate()
    sys.exit(1)

print("Running local headless Lighthouse audit...")
lighthouse_cmd = f'npx -y lighthouse http://localhost:{port} --chrome-flags="--headless --no-sandbox --disable-gpu" --output=json --quiet'

try:
    lh_process = subprocess.run(lighthouse_cmd, shell=True, capture_output=True, timeout=150)
    
    if lh_process.returncode != 0:
        print("Lighthouse execution failed.")
    else:
        stdout_str = lh_process.stdout.decode('utf-8', errors='ignore')
        data = json.loads(stdout_str)
        
        print("\n==================================")
        print("    DETAILED AUDIT FAILURES")
        print("==================================")
        
        audits = data.get('audits', {})
        
        # Categories mapping
        categories_to_check = ['performance', 'accessibility', 'best-practices']
        for cat_name in categories_to_check:
            cat_data = data['categories'][cat_name]
            print(f"\nCategory: {cat_name.upper()} (Score: {int(cat_data['score'] * 100)}/100)")
            print("-" * 40)
            
            # Find audit members for this category
            audit_refs = cat_data.get('auditRefs', [])
            for ref in audit_refs:
                audit_id = ref['id']
                weight = ref.get('weight', 0)
                if weight == 0:
                    continue  # Skip diagnostic informational checks
                    
                audit_info = audits.get(audit_id, {})
                score = audit_info.get('score', 1)
                
                # If score is not 1 (or is None/0), print it
                if score is not None and score < 0.9:
                    title = audit_info.get('title', audit_id)
                    description = audit_info.get('description', '')
                    display_value = audit_info.get('displayValue', '')
                    print(f"[{audit_id}] - {title}")
                    if display_value:
                        print(f"  Value: {display_value}")
                    print(f"  Detail: {description}")
                    details = audit_info.get('details', {})
                    if details and 'items' in details:
                        print("  Items:")
                        for idx, item in enumerate(details['items'][:10]):
                            node = item.get('node', {})
                            selector = node.get('selector', '')
                            snippet = node.get('snippet', '')
                            msg = item.get('source', '') or item.get('text', '') or item.get('message', '') or item.get('url', '')
                            if selector:
                                print(f"    - Element: {selector} (Snippet: {snippet})")
                            elif msg:
                                print(f"    - Message/URL: {msg}")
                            else:
                                print(f"    - Info: {item}")
                    print()
                    
except Exception as e:
    print(f"An error occurred: {e}")

# Kill the preview server
if os.name == 'nt':
    subprocess.run(f"taskkill /F /T /PID {server.pid}", shell=True, capture_output=True)
else:
    server.terminate()
print("Done!")
