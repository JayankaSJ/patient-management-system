# Stage 1: Build the Angular app
FROM node:latest AS build

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the Angular project files to the container
COPY . .

# Build the Angular project in production mode
RUN npm run build --prod

# Stage 2: Serve the Angular app using nginx
FROM nginx:alpine

# Copy the Angular build output to the Nginx server's root directory
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the application to be served
EXPOSE 80

# Start the nginx server to serve the app
CMD ["nginx", "-g", "daemon off;"]
