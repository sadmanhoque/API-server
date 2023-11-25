
# Specify the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json .

# Install application dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

#Specify the port to keep open
EXPOSE 3000

# Specify the command to run the application
CMD ["npm", "run", "dev"]