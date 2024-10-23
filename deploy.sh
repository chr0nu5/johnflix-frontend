#!/bin/bash

rm -rf node_modules
yarn
yarn build

# Function to check if a container is running
is_container_running() {
  container_name=$1
  if [ "$(docker ps -q -f name=$container_name)" ]; then
    return 0
  else
    return 1
  fi
}

# Build the front-flix image
echo "Building the front-flix image..."
docker build -t front-flix:latest .

# Function to start additional containers
start_container() {
  container_name=$1
  if is_container_running "$container_name"; then
    echo "Stopping and removing container $container_name..."
    docker stop "$container_name"
    docker rm "$container_name"
  else
    echo "Container $container_name is not running."
  fi
  echo "Starting container $container_name..."
  docker run -d \
    --name "$container_name" \
    --restart always \
    --env-file .env \
    -v $(pwd)/src:/app/src \
    -p 8080:8080 \
    front-flix:latest
}

start_container "front-flix"