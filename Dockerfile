FROM node:14-alpine as builder
RUN mkdir /app
WORKDIR /app
COPY ./* ./
COPY ./src ./src
RUN npm ci && npm run build

FROM nginx:1.19.4-alpine
COPY --from=builder /app/static /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx.conf /etc/nginx/nginx.conf
CMD envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
