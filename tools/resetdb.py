import os
import subprocess

ans = input(
    "This action will overwrite the database with the default values. Are you sure? [y/n]"
)
if ans != "y":
    print("Aborting.")
    exit(0)

data_path = os.path.join("tools", "data", "cetys-one")

res = subprocess.run(
    f"mongo cetys-one --eval 'db.dropDatabase()' && mongorestore -d cetys-one {data_path}",
    shell=True,
)

if res.returncode == 0:
    print("Database reset successfully.")
else:
    print("Error resetting database: " + res.stderr.decode("utf-8"))
