# Use the official NGINX image as a base
FROM nginx:latest

# Copy the HTML/CSS files to the container
COPY index.html /usr/share/nginx/html/index.html
COPY assets /usr/share/nginx/html/assets
COPY css /usr/share/nginx/html/css
COPY js /usr/share/nginx/html/js

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start NGINX when the container is run
CMD ["nginx", "-g", "daemon off;"]