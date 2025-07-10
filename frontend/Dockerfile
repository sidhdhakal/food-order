# ---- Build Stage ----
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ---- Production Stage ----
FROM nginx:stable-alpine

# Copy the built React app from the 'build' stage
COPY --from=build /app/dist /usr/share/nginx/html

# ADD THIS LINE: Copy our custom NGINX config into the container
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]