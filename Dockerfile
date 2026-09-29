# The site is built in CI (bun run verify); the image only ships the static output.
FROM nginxinc/nginx-unprivileged:alpine
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
