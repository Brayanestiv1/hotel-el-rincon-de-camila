@echo off
start "" json-server --watch ./data/db.json --port 3000
timeout /t 5
start "" "live-server" --open
