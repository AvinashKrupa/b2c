FROM node:16.1 as react-build

WORKDIR /app


COPY . .

RUN npm install


RUN npm run build

FROM nginx:latest

COPY --from=react-build /app/out/* /var/www/html/

EXPOSE 80

