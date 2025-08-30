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

EXPOSE 4000

CMD [ "npm", "start" ]
