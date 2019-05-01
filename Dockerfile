FROM node:alpine as builder

RUN apk add --no-cache --virtual .gyp python make g++

WORKDIR /app

COPY . /app

RUN npm install

FROM node:alpine as app

WORKDIR /app

COPY --from=builder /app .

CMD ["npm","start"]

EXPOSE 80
