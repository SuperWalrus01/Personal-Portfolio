#!/usr/bin/env bash
# cpanel-deploy.sh
# Build the Create React App and copy the build/ output into the cPanel web root.
# Intended to be used as the Deploy Script in cPanel Git Version Control.
set -euo pipefail
IFS=$'\n\t'

echo "[deploy] Starting deployment: $(date -u)"
ROOT_DIR="$(pwd)"
echo "[deploy] Repo root: $ROOT_DIR"

# Allow override via DEPLOY_TO environment variable (set this in cPanel if needed)
WEB_ROOT="${DEPLOY_TO:-$HOME/public_html}"
echo "[deploy] Target web root: $WEB_ROOT"

# If build/ already exists in the repo (we committed it), just copy it to the web root and skip npm build.
if [ -d "$ROOT_DIR/build" ]; then
  echo "[deploy] Found existing build/ in repo. Deploying prebuilt assets..."
  if [ ! -d "$WEB_ROOT" ]; then
    echo "[deploy] Web root does not exist, creating: $WEB_ROOT"
    mkdir -p "$WEB_ROOT"
  fi
  echo "[deploy] Cleaning web root: $WEB_ROOT"
  rm -rf "$WEB_ROOT"/*
  echo "[deploy] Copying build files to web root"
  cp -a "$ROOT_DIR/build/." "$WEB_ROOT/"
  # Ensure correct ownership/permissions
  CP_USER="$(whoami)"
  if command -v chown >/dev/null 2>&1; then
    echo "[deploy] Setting ownership to $CP_USER:$CP_USER"
    chown -R "$CP_USER":"$CP_USER" "$WEB_ROOT" || true
  fi
  find "$WEB_ROOT" -type d -exec chmod 755 {} + || true
  find "$WEB_ROOT" -type f -exec chmod 644 {} + || true
  echo "[deploy] Prebuilt deployment complete: $(date -u)"
  exit 0
fi

# If there's no build/, fall back to attempting an on-server build (requires npm)
# Ensure Node is available; if cPanel provides a Node app environment, this will work.
if ! command -v npm >/dev/null 2>&1; then
  echo "[deploy] npm not found in PATH and no build/ present. If you prefer building locally, commit build/ or set up a Node.js app in cPanel." >&2
  exit 1
fi

# Install dependencies and build
echo "[deploy] Installing dependencies (ci)..."
npm ci --silent

echo "[deploy] Building production bundle..."
npm run build --silent

# Copy built files to web root
if [ ! -d "$WEB_ROOT" ]; then
  echo "[deploy] Web root does not exist, creating: $WEB_ROOT"
  mkdir -p "$WEB_ROOT"
fi

echo "[deploy] Cleaning web root: $WEB_ROOT"
rm -rf "$WEB_ROOT"/*

echo "[deploy] Copying build files to web root"
cp -a "$ROOT_DIR/build/." "$WEB_ROOT/"

# Ensure correct ownership/permissions (run as cPanel user)
CP_USER="$(whoami)"
if command -v chown >/dev/null 2>&1; then
  echo "[deploy] Setting ownership to $CP_USER:$CP_USER"
  chown -R "$CP_USER":"$CP_USER" "$WEB_ROOT" || true
fi

find "$WEB_ROOT" -type d -exec chmod 755 {} + || true
find "$WEB_ROOT" -type f -exec chmod 644 {} + || true

# Optional: clear npm cache to free space (commented out)
# npm cache clean --force || true

echo "[deploy] Deployment complete: $(date -u)"
exit 0
