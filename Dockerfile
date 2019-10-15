FROM node:10.16.3-alpine

COPY package.json /usr/src/app/

CMD ["yarn", "run", "server"]

