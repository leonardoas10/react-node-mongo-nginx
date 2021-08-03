FROM node:12-alpine
RUN apk update && apk add --no-cache nano curl
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD ["npm", "start"]
EXPOSE 8080

# FROM node:12-alpine as Build
# WORKDIR /app
# COPY package.json /app
# # COPY .babelrc ./
# RUN npm install
# COPY . /app
# RUN npm run build

# FROM node:12-alpine
# WORKDIR /app
# COPY package.json /app
# # COPY .babelrc ./
# RUN npm install
# COPY --from=Build /app/dist /dist
# EXPOSE 8080
# CMD npm start