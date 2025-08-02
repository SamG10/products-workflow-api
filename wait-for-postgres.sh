#!/bin/sh
# Simple script to wait for PostgreSQL to be ready

HOST=${1:-postgres}
PORT=${2:-5432}
TIMEOUT=${3:-30}

echo "Waiting for PostgreSQL at $HOST:$PORT..."

i=0
until pg_isready -h "$HOST" -p "$PORT" -U admin_prod; do
  i=$((i+1))
  if [ $i -ge $TIMEOUT ]; then
    echo "PostgreSQL is not ready after $TIMEOUT seconds"
    exit 1
  fi
  echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done

echo "PostgreSQL is ready!"
