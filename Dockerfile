FROM nginx:alpine

COPY /var/lib/jenkins/workspace/b2c/out/* /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
