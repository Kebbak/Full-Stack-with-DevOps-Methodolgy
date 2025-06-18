# Use a lightweight Node.js base image
FROM node:18-alpine

# Create a non-root user and group early
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set working directory and ensure permissions
WORKDIR /app
COPY package*.json ./

# Install dependencies as root
RUN npm install

# Copy the rest of the application code
COPY . .

# Change ownership of the app directory to the non-root user
RUN chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

# Expose the port your app runs on
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]
