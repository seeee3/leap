FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN npx vite --version

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
