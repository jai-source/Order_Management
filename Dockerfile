FROM node:22

WORKDIR /app

copy package*.json ./

RUN npm install

copy . .

EXPOSE 3000

CMD ["node" , "src/server.js"]