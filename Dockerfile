# Pull base image.
FROM nginx:1.10.2-alpine

# Copy build
RUN rm -rf /usr/share/nginx/html/*
COPY public/ /usr/share/nginx/html/
COPY alpine-nginx.conf /etc/nginx/conf.d/default.conf
