FROM node:lts-hydrogen as Builder
WORKDIR /app
COPY package*.json .
RUN npm install --force
COPY . .
RUN npm run build

FROM nginx:latest
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
