import subprocess
import time
import urllib.request
import json
import os
import sys

print("Starting Vite preview server...")
# Start the preview server in the background, using utf-8 and ignoring encoding errors
server = subprocess.Popen("npm run preview", shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, encoding='utf-8', errors='ignore')

# Wait for the port to become active
port = 4173
server_ready = False
for i in range(15):
    time.sleep(1)
    try:
        req = urllib.request.Request(f"http://localhost:{port}", headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=2) as r:
            if r.status == 200:
                server_ready = True
                print(f"Vite preview server is active at http://localhost:{port}")
                break
    except Exception:
        pass

if not server_ready:
    print("Vite preview server failed to start on port 4173 in 15s. Exiting.")
    if os.name == 'nt':
        subprocess.run(f"taskkill /F /T /PID {server.pid}", shell=True, capture_output=True)
    else:
        server.terminate()
    sys.exit(1)

print("Running local headless Lighthouse audit...")
# We add -y to npx to auto-install lighthouse package if not cached, and run headless chrome
lighthouse_cmd = f'npx -y lighthouse http://localhost:{port} --chrome-flags="--headless --no-sandbox --disable-gpu" --output=json --quiet'
print(f"Executing: {lighthouse_cmd}")

try:
    # Run lighthouse command, capturing stdout in binary to prevent encoding crashes
    lh_process = subprocess.run(lighthouse_cmd, shell=True, capture_output=True, timeout=150)
    
    if lh_process.returncode != 0:
        print("Lighthouse execution failed. Error details:")
        print(lh_process.stderr.decode('utf-8', errors='ignore'))
    else:
        # Load and parse scores from bytes
        stdout_str = lh_process.stdout.decode('utf-8', errors='ignore')
        data = json.loads(stdout_str)
        categories = data['categories']
        
        perf = int(categories['performance']['score'] * 100)
        access = int(categories['accessibility']['score'] * 100)
        bp = int(categories['best-practices']['score'] * 100)
        seo = int(categories['seo']['score'] * 100)
        
        print("\n==================================")
        print("   LOCAL LIGHTHOUSE AUDIT RESULTS")
        print("==================================")
        print(f" PERFORMANCE:    {perf}/100")
        print(f" ACCESSIBILITY:  {access}/100")
        print(f" BEST PRACTICES: {bp}/100")
        print(f" SEO:            {seo}/100")
        print("==================================\n")
except Exception as e:
    print(f"An error occurred while running Lighthouse: {e}")

# Kill the preview server
print("Cleaning up preview server process...")
if os.name == 'nt':
    subprocess.run(f"taskkill /F /T /PID {server.pid}", shell=True, capture_output=True)
else:
    server.terminate()
print("Done!")
