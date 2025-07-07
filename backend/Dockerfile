# Use an official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker caching
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of the application source code
COPY . .

# Your backend API probably runs on a specific port.
# Let's assume it's 5000. Change this if your app uses a different port.
EXPOSE 4000

# The command to start your server
# Make sure your package.json has a "start" script, e.g., "start": "node index.js"
CMD [ "npm", "start" ]
