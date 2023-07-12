FROM node:lts-slim as build-stage
WORKDIR /app
ENV REACT_APP_API_URL http://api.account.com
ENV REACT_APP_API_PORT ''
ENV REACT_APP_API_ENDPOINT /account
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build


FROM nginx:stable as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

