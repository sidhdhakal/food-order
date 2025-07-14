#!/bin/bash

# --- Configuration ---
LOCAL_HOST="localhost"
FRONTEND_PORT="5173"
NEW_VALUE="FRONTEND_URL=\"http://${LOCAL_HOST}:${FRONTEND_PORT}\""

# --- Path Logic (This is the key fix) ---
# Get the directory where the script itself is located.
SCRIPT_DIR=$(dirname "$0")
# Build an absolute path to the target file, no matter where the script is run from.
FILE_TO_FIND="${SCRIPT_DIR}/../backend/.env"

# --- Main Logic ---
# Check if the .env file exists. If not, create it.
if [ ! -f "$FILE_TO_FIND" ]; then
  echo "🟡 INFO: File not found at $FILE_TO_FIND. Creating it..."
  touch "$FILE_TO_FIND"
fi

# Check if the FRONTEND_URL line already exists in the file
if grep -q "^FRONTEND_URL=" "$FILE_TO_FIND"; then
  # It exists, so update it using sed
  sed -i -e "s|^FRONTEND_URL.*|$NEW_VALUE|" "$FILE_TO_FIND"
  echo "✅ FRONTEND_URL updated in ${FILE_TO_FIND}"
else
  # It does not exist, so append it to the end of the file
  echo "$NEW_VALUE" >> "$FILE_TO_FIND"
  echo "➕ FRONTEND_URL added to ${FILE_TO_FIND}"
fi