FROM node:16.1 as react-build

WORKDIR /app


COPY . .

RUN npm install


RUN npm run build


FROM nginx:alpine


WORKDIR /usr/share/nginx/html


COPY --from=react-build /app/out /usr/share/nginx/html 


COPY nginx.conf /etc/nginx/

EXPOSE 80 8090


CMD ["nginx"]
