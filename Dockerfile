# Stage 1: Build the app
FROM node:22.17.1-alpine3.21 

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the app source code
COPY . .

# Build the app for production
RUN npm run build

CMD ["npm", "run", "dev"]
