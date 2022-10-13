FROM node:10 AS builder

WORKDIR /app


COPY . .


RUN npm run build


FROM nginx:alpine


WORKDIR /usr/share/nginx/html


COPY --from=builder /app/build .

EXPOSE 80


CMD ["nginx"]
