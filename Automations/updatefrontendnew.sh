#!/bin/bash

# Localhost IP and Port
LOCAL_HOST="localhost"
PORT="4000"  # your local backend port

# Path to the .env file
file_to_find="../frontend/.env"

# Check current value of VITE_BACKEND_URL
current_url=$(grep VITE_BACKEND_URL "$file_to_find")

# Desired value
new_value="VITE_BACKEND_URL=\"http://${LOCAL_HOST}:${PORT}\""

# Update if it's different
if [[ "$current_url" != "$new_value" ]]; then
    if [ -f "$file_to_find" ]; then
        sed -i -e "s|VITE_BACKEND_URL.*|$new_value|g" "$file_to_find"
        echo "✅ .env updated to use local backend: $new_value"
    else
        echo "❌ ERROR: $file_to_find not found."
    fi
else
    echo "ℹ️ No change needed. Already using local backend."
fi
