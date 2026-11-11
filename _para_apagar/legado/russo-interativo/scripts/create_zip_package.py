import os
import zipfile
import shutil

root_dir = os.path.abspath(os.getcwd())
public_dir = os.path.join(root_dir, 'public')
os.makedirs(public_dir, exist_ok=True)

zip_filename = 'curso-russo-30-aulas-completo.zip'
public_zip_path = os.path.join(public_dir, zip_filename)
root_zip_path = os.path.join(root_dir, zip_filename)

# Remove old zips if they exist
for p in [public_zip_path, root_zip_path]:
    if os.path.exists(p):
        os.remove(p)

exclude_dirs = {
    'node_modules',
    '.git',
    'dist',
    '.cache',
    '__pycache__',
}

exclude_files = {
    zip_filename,
    'bun.lockb',
}

files_added = []

with zipfile.ZipFile(public_zip_path, 'w', compression=zipfile.ZIP_DEFLATED) as zipf:
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Filter out directories
        dirnames[:] = [d for d in dirnames if d not in exclude_dirs and not d.startswith('.')]
        
        for filename in filenames:
            if filename in exclude_files:
                continue
            if filename.endswith('.zip') or filename.endswith('.pyc'):
                continue
                
            full_path = os.path.join(dirpath, filename)
            rel_path = os.path.relpath(full_path, root_dir)
            
            # Avoid putting the output zip into itself
            if 'public/' + zip_filename in rel_path or rel_path == zip_filename:
                continue
                
            zipf.write(full_path, arcname=os.path.join('curso-russo-30-aulas', rel_path))
            files_added.append(rel_path)

# Copy to root as well
shutil.copyfile(public_zip_path, root_zip_path)

size_mb = os.path.getsize(public_zip_path) / (1024 * 1024)
print(f"ZIP package created successfully!")
print(f"Total files archived: {len(files_added)}")
print(f"Package size: {size_mb:.2f} MB")
print(f"Locations:")
print(f" - {public_zip_path}")
print(f" - {root_zip_path}")
