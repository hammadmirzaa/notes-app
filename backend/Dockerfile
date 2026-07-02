# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the application port (NestJS default is usually 3000)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]
