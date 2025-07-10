#!/bin/sh
# Wait until MongoDB is ready

echo "Waiting for MongoDB..."

while ! nc -z mongo 27017; do
  sleep 1
done

echo "MongoDB is up - starting app"
npm start
