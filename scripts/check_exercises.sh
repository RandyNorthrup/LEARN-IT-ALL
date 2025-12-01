#!/bin/bash

echo "NETWORK+ EXERCISE COMPLIANCE AUDIT"
echo "===================================="
echo ""

PASS_COUNT=0
FAIL_COUNT=0
TOTAL=0

# Check each exercise
for f in content/courses/comptia-network-plus/exercises/exercise-*.json; do
  TOTAL=$((TOTAL + 1))
  FILENAME=$(basename "$f")
  CHAR_COUNT=$(wc -c < "$f")
  
  # Extract fields using jq
  HAS_STARTER=$(jq '.starterCode' "$f" 2>/dev/null | grep -q '.' && echo "YES" || echo "NO")
  HAS_SOLUTION=$(jq '.solution' "$f" 2>/dev/null | grep -q '.' && echo "YES" || echo "NO")
  HAS_HINTS=$(jq '.hints | length' "$f" 2>/dev/null)
  HAS_TESTS=$(jq '.testCases | length' "$f" 2>/dev/null)
  HAS_DESCRIPTION=$(jq '.description' "$f" 2>/dev/null | grep -q '.' && echo "YES" || echo "NO")
  
  # Check for realistic scenarios (look for keywords)
  SCENARIOS=$(jq '.starterCode' "$f" 2>/dev/null | grep -io 'scenario' | wc -l)
  QUESTIONS=$(jq '.starterCode' "$f" 2>/dev/null | grep -io 'question\|q[0-9]' | wc -l)
  
  # Determine if realistic (has scenario context)
  IS_REALISTIC="NO"
  if jq '.starterCode' "$f" 2>/dev/null | grep -qi 'you are\|scenario\|design\|troubleshoot\|diagnose\|configure'; then
    IS_REALISTIC="YES"
  fi
  
  # Check compliance
  COMPLIANCE="✓"
  if [ "$CHAR_COUNT" -lt 10000 ]; then
    COMPLIANCE="✗"
    FAIL_COUNT=$((FAIL_COUNT + 1))
  elif [ "$HAS_STARTER" != "YES" ] || [ "$HAS_SOLUTION" != "YES" ] || [ "$HAS_HINTS" -lt 5 ] || [ "$HAS_TESTS" -lt 5 ]; then
    COMPLIANCE="✗"
    FAIL_COUNT=$((FAIL_COUNT + 1))
  else
    PASS_COUNT=$((PASS_COUNT + 1))
  fi
  
  echo "$COMPLIANCE | $FILENAME | $CHAR_COUNT chars | $SCENARIOS scenarios | $QUESTIONS Q's | $HAS_HINTS hints | $HAS_TESTS tests | Realistic: $IS_REALISTIC"
done

echo ""
echo "===================================="
echo "SUMMARY"
echo "===================================="
echo "Total Exercises: $TOTAL"
echo "PASS: $PASS_COUNT"
echo "FAIL: $FAIL_COUNT"
echo "Compliance Rate: $(echo "scale=1; ($PASS_COUNT * 100) / $TOTAL" | bc)%"
