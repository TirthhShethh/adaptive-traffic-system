FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Expose port 5173 for Vite
EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
