FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install && npm install -g nodemon
COPY . .
CMD ["nodemon", "backend"]
