FROM node:22-alpine

WORKDIR /app
COPY . .
RUN npm install -g http-server

ENV PORT=4002

CMD sh -c "http-server -p $PORT --cors"
