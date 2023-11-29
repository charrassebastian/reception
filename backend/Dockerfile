FROM node:lts-hydrogen
ADD package*.json ./
RUN npm install
ADD app.js ./
ADD controllers ./controllers
ADD db ./db
ADD models ./models
ADD routes.js ./
ADD server.js ./
ADD services ./services
ADD __tests__ ./__tests__
EXPOSE 8083 
CMD ["node", "server.js"]
