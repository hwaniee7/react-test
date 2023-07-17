FROM node:lts-slim as build-stage

WORKDIR  /usr/src/app

ENV REACT_APP_API_URL http://api.account.com
ENV REACT_APP_API_PORT ''
ENV REACT_APP_API_ENDPOINT /account

ARG PLATFORM=linux/amd64
ARG ENV_NAME

COPY package*.json yarn.lock ./
RUN yarn

COPY . ./
RUN ENV_NAME=$ENV_NAME yarn build


FROM nginx:stable as production-stage

RUN sed -i '9 a\        try_files $uri $uri/ /index.html;' /etc/nginx/conf.d/default.conf
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]



