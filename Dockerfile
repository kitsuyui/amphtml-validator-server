FROM node:16.4.2-alpine
RUN \
apk add --no-cache tini && \
mkdir -p /app
WORKDIR /app
ADD . /app
RUN yarn install --flat --production=true && yarn test
ENTRYPOINT ["tini", "--", "yarn", "start"]
CMD ["--host", "0.0.0.0", "--port", "8080"]
EXPOSE 8080
