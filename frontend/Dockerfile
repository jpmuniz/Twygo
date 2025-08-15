FROM node:20

WORKDIR /app

COPY package*.json ./


RUN npm install
RUN npm install @chakra-ui/react@latest @chakra-ui/icons @emotion/react@latest @emotion/styled@latest framer-motion@latest

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]