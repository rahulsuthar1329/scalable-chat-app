FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install --production && npm install --only=dev

COPY . .

RUN npm run build

EXPOSE 4000

CMD [ "npm", "start" ]