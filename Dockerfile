
FROM node:10 ad builder

WORKDIR /app


COPY . .


RUN npm build


FROM nginx:alpine


WORKDIR /usr/share/nginx/html


COPY--from=builder /app/build .


CMD ["nginx", "-g", "daemon off;"]
