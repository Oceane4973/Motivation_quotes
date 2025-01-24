FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY app/package.json ./app/
WORKDIR /app/app
RUN npm install

WORKDIR /app
COPY . .

EXPOSE 8080

CMD ["npm", "run", "start"]
