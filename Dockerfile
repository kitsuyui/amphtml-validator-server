FROM node:8.14.1-alpine
RUN mkdir -p /app
WORKDIR /app
ADD . /app
RUN yarn install --flat --production=true && yarn test
ENTRYPOINT ["yarn", "start"]
CMD ["--host", "0.0.0.0", "--port", "8080"]
EXPOSE 8080
