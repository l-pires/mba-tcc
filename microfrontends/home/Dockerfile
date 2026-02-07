FROM node:22-alpine

WORKDIR /app
COPY src/ .
RUN npm install -g http-server

ENV PORT=4001

CMD sh -c "http-server -p $PORT --cors"
