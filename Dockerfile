FROM node:10 as builder

WORKDIR /app


COPY . .


RUN npm build


FROM nginx:alpine


WORKDIR /usr/share/nginx/html


COPY--from=builder /app/build .

EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]
