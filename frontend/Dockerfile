FROM node:lts-hydrogen
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --force
COPY . ./ 
EXPOSE 8084
CMD ["npm", "run", "dev", "--", "--host", "--port", "8084"]
