FROM nginx
WORKDIR /dist
# move the config file to the content
COPY /dist/ /dist/

COPY /nginx/nginx.conf /etc/nginx/nginx.conf
# nginx config should be same with the server port
RUN ls -al /dist
RUN ls -al /usr/share/nginx/html

EXPOSE 8000