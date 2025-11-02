# Build docker image for the frontend service
# This Dockerfile sets up a Node.js environment for the frontend service only
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .    
EXPOSE 3000
ENV NODE_ENV=development
ENTRYPOINT ["npm"]
CMD ["start"]