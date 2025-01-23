FROM node:18-alpine

WORKDIR /app

COPY ../../../frontend/package*.json ./
RUN npm install

WORKDIR /app/app

COPY ../../../frontend/app/package.json ./app/
RUN npm install

COPY ../../../frontend .

EXPOSE 8080

CMD ["npm", "run", "start"]
