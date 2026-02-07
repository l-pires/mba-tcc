#!/bin/bash

if [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
  echo "Usage: $0 [up|down] [-d]"
  echo
  echo "Examples:"
  echo "  $0           # by default: start in foreground"
  echo "  $0 up -d     # start in detached mode"
  echo "  $0 up        # start in foreground"
  echo "  $0 down      # stop and remove containers"
  exit 0
fi

COMPOSE_FILES="-f compose.backend.yaml -f compose.frontend.yaml"

if [ $# -eq 0 ]; then
  docker compose $COMPOSE_FILES up
else
  docker compose $COMPOSE_FILES "$@"
fi
