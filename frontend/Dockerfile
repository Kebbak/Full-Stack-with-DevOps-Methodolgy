# Create dockerfile for the frontend service
FROM node:18-alpine
# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code
COPY . .
# Expose the port the app runs on
EXPOSE 3000
# Start the application
CMD ["npm", "start"]
# Use a non-root user to run the apps
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser