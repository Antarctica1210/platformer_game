# ---- Base Stage ----
# Use a specific Node.js version for reproducibility
FROM node:20-alpine AS base

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# ---- Dependencies Stage ----
FROM base AS dependencies

# Install production dependencies
RUN npm ci --only=production

# ---- Build Stage ----
FROM base AS build

# Install all dependencies (including devDependencies)
RUN npm ci
# Copy the rest of the application source code
COPY . .
# Compile TypeScript to JavaScript
RUN npm run build

# ---- Production Stage ----
FROM base AS production
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/index.js"]