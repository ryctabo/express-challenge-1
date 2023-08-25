FROM node:18-alpine
WORKDIR /app
COPY . ./
RUN npm install && npm run build
EXPOSE 8080
ENTRYPOINT [ "node", "dist/index.js" ]
