FROM node:18.4 AS build

WORKDIR /app

COPY ["./", ".jshintrc", "./"]

RUN yarn install
RUN yarn build

FROM nginx:stable-alpine as prod

COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
