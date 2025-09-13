# Use Node 20
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose port (Vite default)
EXPOSE 5173

# Start frontend dev server
CMD ["npm", "run", "dev", "--", "--host"]
