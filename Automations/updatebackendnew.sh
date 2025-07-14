#!/bin/bash

# Local frontend address (React usually runs on 5173 in Vite)
LOCAL_HOST="localhost"
FRONTEND_PORT="5173"

# Desired value
new_value="FRONTEND_URL=\"http://${LOCAL_HOST}:${FRONTEND_PORT}\""

# Path to the .env file
file_to_find="../backend/.env.docker"

# Check if file exists
if [ ! -f "$file_to_find" ]; then
  echo "❌ ERROR: File not found at $file_to_find"
  exit 1
fi

# Check if FRONTEND_URL line exists
if grep -q "^FRONTEND_URL=" "$file_to_find"; then
  # Update the existing line
  sed -i -e "s|^FRONTEND_URL.*|$new_value|g" "$file_to_find"
  echo "✅ FRONTEND_URL updated to: $new_value"
else
  # Append the line if it doesn't exist
  echo "$new_value" >> "$file_to_find"
  echo "➕ FRONTEND_URL added: $new_value"
fi
