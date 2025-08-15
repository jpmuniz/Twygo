#!/bin/bash
set -e

# Remove PID antigo do Rails
rm -f /var/app/tmp/pids/server.pid

# Executa o comando padrão do container
exec "$@"
