# ---- Stage 1: Build the React App ----
# Use an official Node.js image as the builder.
# 'alpine' is a lightweight version of Linux.
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the app for production. The static files will be in /app/dist
RUN npm run build


# ---- Stage 2: Serve the App with Nginx ----
# Use a lightweight Nginx image for the final container
FROM nginx:stable-alpine

# Copy the static files from the 'builder' stage to the Nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html

# We need to tell Nginx how to handle single-page app routing.
# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d

# Expose port 80 to the outside world
EXPOSE 80

# Command to run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
