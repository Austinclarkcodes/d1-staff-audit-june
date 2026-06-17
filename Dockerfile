FROM node:22-slim

WORKDIR /app

# Server dependencies
COPY package*.json ./
RUN npm install

# Client dependencies + source
COPY client/package*.json ./client/
RUN cd client && npm install

# Copy all source (node_modules excluded via .dockerignore)
COPY . .

# Build client
RUN cd client && npm run build

EXPOSE 3001
CMD ["node", "server.js"]
