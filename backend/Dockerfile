# Base image
FROM node:16 AS builder

# Create app directory
WORKDIR /backend

# Copy package.json and package-lock.json
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the app
RUN npm run build

# Expose the necessary port
EXPOSE 4004

# Command to run the application
CMD ["npm", "run", "start:dev"]