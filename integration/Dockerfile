FROM node:22-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ENV API_HOST_SOBRE=http://localhost:3001
ENV API_HOST_MARCOS=http://localhost:3002
ENV API_HOST_CONTATOS=http://localhost:3003

CMD ["node", "src/main.js"]
