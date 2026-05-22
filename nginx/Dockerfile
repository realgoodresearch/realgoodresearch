FROM nginx:1.27-alpine

RUN apk add --no-cache openssl

COPY entrypoint-nginx.sh /entrypoint-nginx.sh
RUN chmod +x /entrypoint-nginx.sh

ENTRYPOINT ["/entrypoint-nginx.sh"]
