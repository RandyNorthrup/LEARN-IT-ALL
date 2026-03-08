#!/usr/bin/env bash
# start.sh — Launch the LEARN-IT-ALL development server
# The Next.js dev server runs both the frontend and backend (API routes) together.

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

PID_FILE="$SCRIPT_DIR/.dev-server.pid"

if [[ -f "$PID_FILE" ]]; then
  OLD_PID=$(cat "$PID_FILE")
  if kill -0 "$OLD_PID" 2>/dev/null; then
    echo "⚠️  Dev server is already running (PID $OLD_PID)."
    echo "   Run ./stop.sh first, or visit http://localhost:3000"
    exit 1
  else
    rm -f "$PID_FILE"
  fi
fi

echo "🚀 Starting LEARN-IT-ALL dev server..."
nohup npm run dev > /tmp/learn-it-all-dev.log 2>&1 &
DEV_PID=$!
echo "$DEV_PID" > "$PID_FILE"

echo "⏳ Waiting for server to be ready on http://localhost:3000 ..."

# Wait up to 30 seconds for the server to respond
for i in $(seq 1 30); do
  if curl -s -o /dev/null -w '' http://localhost:3000 2>/dev/null; then
    echo "✅ Server is running! (PID $DEV_PID)"
    echo "   Frontend + Backend: http://localhost:3000"
    echo "   Logs: /tmp/learn-it-all-dev.log"
    echo ""
    echo "   Run ./stop.sh to shut it down."
    exit 0
  fi
  sleep 1
done

echo "✅ Server started (PID $DEV_PID) but may still be compiling."
echo "   Check http://localhost:3000 in a moment."
echo "   Logs: /tmp/learn-it-all-dev.log"
echo "   Run ./stop.sh to shut it down."
