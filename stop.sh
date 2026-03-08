#!/usr/bin/env bash
# stop.sh — Stop the LEARN-IT-ALL development server

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PID_FILE="$SCRIPT_DIR/.dev-server.pid"

if [[ ! -f "$PID_FILE" ]]; then
  echo "ℹ️  No PID file found. Checking for any process on port 3000..."
  PORT_PID=$(lsof -ti :3000 2>/dev/null || true)
  if [[ -n "$PORT_PID" ]]; then
    echo "🛑 Killing process(es) on port 3000: $PORT_PID"
    echo "$PORT_PID" | xargs kill 2>/dev/null || true
    sleep 1
    # Force kill if still alive
    PORT_PID=$(lsof -ti :3000 2>/dev/null || true)
    if [[ -n "$PORT_PID" ]]; then
      echo "$PORT_PID" | xargs kill -9 2>/dev/null || true
    fi
    echo "✅ Stopped."
  else
    echo "ℹ️  No dev server appears to be running."
  fi
  exit 0
fi

PID=$(cat "$PID_FILE")
echo "🛑 Stopping dev server (PID $PID)..."

# Kill the process tree (npm spawns child processes)
if kill -0 "$PID" 2>/dev/null; then
  # Kill entire process group
  kill -- -"$PID" 2>/dev/null || kill "$PID" 2>/dev/null || true
  sleep 1
  # Force kill if still alive
  if kill -0 "$PID" 2>/dev/null; then
    kill -9 -- -"$PID" 2>/dev/null || kill -9 "$PID" 2>/dev/null || true
  fi
  echo "✅ Server stopped."
else
  echo "ℹ️  Process $PID was not running."
fi

rm -f "$PID_FILE"

# Clean up any remaining processes on port 3000
PORT_PID=$(lsof -ti :3000 2>/dev/null || true)
if [[ -n "$PORT_PID" ]]; then
  echo "🧹 Cleaning up remaining processes on port 3000..."
  echo "$PORT_PID" | xargs kill 2>/dev/null || true
  sleep 1
  PORT_PID=$(lsof -ti :3000 2>/dev/null || true)
  if [[ -n "$PORT_PID" ]]; then
    echo "$PORT_PID" | xargs kill -9 2>/dev/null || true
  fi
fi
