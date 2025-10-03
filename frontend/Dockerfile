# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:22 AS build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build

CMD ["npx", "vite"]