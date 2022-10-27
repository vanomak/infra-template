FROM node:16.6.0
RUN npm install -g serve
COPY build /home/node/app
WORKDIR /home/node/app
EXPOSE 3000
CMD serve -s .
