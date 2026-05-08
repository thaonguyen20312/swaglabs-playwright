# 1. Use the official Playwright base image 
FROM mcr.microsoft.com/playwright:v1.59.1-jammy

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# 4. Copy the rest of the application code
COPY . .

# 5. Run Playwright tests by default
CMD ["npx", "playwright", "test"]