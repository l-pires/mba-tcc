FROM node:22-alpine

WORKDIR /app
COPY src/ .
RUN npm install -g serve

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["sh", "-lc", "serve -s . -l ${PORT:-8000}"]
