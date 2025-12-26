# Dockerfile for testing VitePress build locally
FROM node:20-alpine

# Install build dependencies for native modules and git for VitePress
RUN apk add --no-cache python3 make g++ git

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with legacy peer deps and skip building native modules (node-sass)
# We use modern sass (Dart Sass) which doesn't need compilation
RUN npm ci --legacy-peer-deps --ignore-scripts

# Copy all files
COPY . .

# Build the documentation
RUN npm run docs:build

# Expose port for preview
EXPOSE 4173

# Start preview server
CMD ["npm", "run", "docs:preview", "--", "--host", "0.0.0.0"]
