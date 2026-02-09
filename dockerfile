# Use a lightweight official Node.js runtime as a parent image (e.g., node:24-alpine)
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

RUN apk add --no-cache python3 make g++

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies (only production dependencies if you use --omit=dev)
RUN npm install --omit=dev


# Copy the rest of the application source code to the container
COPY . .

# Expose the port the app runs on (e.g., 3000)
EXPOSE ${PORT}

# Define the command to run the application
CMD ["npm", "run", "dev"]
