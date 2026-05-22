#!/bin/sh
set -eu

CERT_DOMAIN="${CERT_DOMAIN:-realgoodresearch.com}"
LIVE_DIR="/etc/letsencrypt/live/${CERT_DOMAIN}"
CERT_FILE="${LIVE_DIR}/fullchain.pem"
KEY_FILE="${LIVE_DIR}/privkey.pem"

if [ ! -s "${CERT_FILE}" ] || [ ! -s "${KEY_FILE}" ]; then
  echo "No Let's Encrypt cert found for ${CERT_DOMAIN}; generating temporary self-signed cert."
  mkdir -p "${LIVE_DIR}"
  openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
    -keyout "${KEY_FILE}" \
    -out "${CERT_FILE}" \
    -subj "/CN=${CERT_DOMAIN}"
fi

exec nginx -g 'daemon off;'
