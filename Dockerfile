FROM node:16.1 as react-build

WORKDIR /app


COPY . .

RUN npm install


RUN npm run build

FROM httpd:2.4

COPY --from=react-build /app/out/* /usr/local/apache2/htdocs/

EXPOSE 3000

