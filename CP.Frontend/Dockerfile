FROM node:16-alpine
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY .npmrc ./
RUN yarn install --frozen-lockfile
COPY . .
EXPOSE 3000
CMD ["npm", "start"]