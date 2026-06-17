FROM node:22-slim

WORKDIR /app

# Install server deps
COPY package*.json ./
RUN npm install --production

# Build client
COPY client/package*.json ./client/
RUN cd client && npm install

COPY . .
RUN cd client && npm run build

EXPOSE 3001
CMD ["node", "server.js"]
