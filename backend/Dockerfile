# Build docker image for the backend service
# This Dockerfile sets up a Node.js environment for the backend service
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
ENV NODE_ENV=development
ENTRYPOINT ["node"]
CMD ["server.js"]
