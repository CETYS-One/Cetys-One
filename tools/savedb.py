import os
import subprocess
import shutil

ans = input(
    "This action will overwrite the database with the default values. Are you sure? [y/n]"
)

if ans != "y":
    print("Aborting.")
    exit(0)

data_path = os.path.join("tools", "data")
if os.path.isdir(data_path):
    shutil.rmtree(data_path)

res = subprocess.run(f"mongodump -d cetys-one -o {data_path}", shell=True)

if res.returncode == 0:
    print("Database reset successfully.")
else:
    print("Error resetting database: " + res.stderr.decode("utf-8"))
