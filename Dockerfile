# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install project dependencies (both frontend and backend)
RUN npm install

# Copy the entire project into the container
COPY . .

# Install Truffle globally
RUN npm install -g truffle

# Expose ports for Ganache and the app (default Ganache port is 7545)
EXPOSE 8545
EXPOSE 3000

# Run Ganache (for testing the blockchain locally)
CMD ganache-cli --port 8545 --deterministic & truffle migrate --network development
