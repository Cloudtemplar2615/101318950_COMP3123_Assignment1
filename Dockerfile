# Backend Dockerfile for COMP3123 Assignment 1

# Use Node 20 image
FROM node:20

# Set working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Environment variables (you can override in docker-compose if needed)
ENV PORT=8080

# Expose backend port
EXPOSE 8080

# Start the backend server
CMD ["node", "server.js"]
