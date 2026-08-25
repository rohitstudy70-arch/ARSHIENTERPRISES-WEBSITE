import urllib.request
import re
import os
import sys
from urllib.parse import urljoin

url = "https://www.arshigps.com/"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

print(f"Fetching {url}...")
try:
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=15) as r:
        html = r.read().decode('utf-8', errors='ignore')
except Exception as e:
    print(f"Error fetching URL: {e}")
    sys.exit(1)

# Regex to find all img tags src attribute
img_srcs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html)
# Also find other potential images in srcset or link hrefs
other_srcs = re.findall(r'srcset=["\']([^"\']+)["\']', html)
for src_set in other_srcs:
    # Split by comma and extract path
    for item in src_set.split(','):
        cleaned_item = item.strip().split(' ')[0]
        if cleaned_item:
            img_srcs.append(cleaned_item)

# Unique list
unique_urls = list(set(img_srcs))
print(f"Found {len(unique_urls)} image URLs in total. Listing them:")

download_dir = os.path.join(os.getcwd(), 'public', 'assets', 'live-images')
os.makedirs(download_dir, exist_ok=True)
print(f"Download directory: {download_dir}\n")

downloaded_count = 0
for img_path in unique_urls:
    # Resolve relative URL to absolute
    abs_url = urljoin(url, img_path)
    
    # Check if it looks like an image file
    if any(abs_url.lower().endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif']):
        filename = os.path.basename(abs_url.split('?')[0])
        if not filename:
            continue
            
        print(f"Downloading: {abs_url} -> {filename}")
        try:
            img_req = urllib.request.Request(abs_url, headers=headers)
            with urllib.request.urlopen(img_req, timeout=10) as r:
                data = r.read()
                
            local_path = os.path.join(download_dir, filename)
            with open(local_path, 'wb') as f:
                f.write(data)
            downloaded_count += 1
            print(f"  Saved to: {local_path}")
        except Exception as e:
            print(f"  Failed to download: {e}")

print(f"\nCompleted! Downloaded {downloaded_count} images successfully.")
