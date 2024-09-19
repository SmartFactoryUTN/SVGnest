# Use the official Nginx image from Docker Hub
FROM nginx:alpine

# Copy your Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy your public directory to the Nginx html directory
COPY . /usr/share/nginx/html

# Expose the port Nginx will run on
EXPOSE 80
