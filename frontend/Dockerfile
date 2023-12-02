FROM node:lts-hydrogen as Builder
WORKDIR /app
COPY package*.json .
RUN npm install --force
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8084
CMD ["nginx", "-g", "daemon off;"]
