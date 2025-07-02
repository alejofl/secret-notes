FROM node:22.17.0-alpine3.21

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

# Build the application
RUN npm run build

# Generate Prisma client
RUN npm run prisma:generate

CMD ["npm", "run", "start"]