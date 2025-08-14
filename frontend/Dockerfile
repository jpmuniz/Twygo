FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion && npm install

COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
