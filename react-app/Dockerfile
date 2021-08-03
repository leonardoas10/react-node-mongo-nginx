# FROM node:12-alpine AS build-deps 
# # 10%

# WORKDIR /app
# #20%
# COPY package.json ./

# RUN npm install

# COPY . /app

# RUN npm run-script build
# # 100%

# # STAGE 2 ??? tengo otro FROM? = todo lo anterior lo almaceno en una memoria local temporal (build-deps) del contenedor.

# FROM nginx:1.12-alpine
# # 0%

# COPY --from=build-deps /app/build /usr/share/nginx/html
# # 50%

# EXPOSE 80
# # 80%

# CMD ["nginx", "-g", "daemon off;"]
# #100%

FROM node:12-alpine
ENV CI = true
RUN apk update && apk add --no-cache nano curl
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
RUN npm cache clean --force
CMD ["npm", "start"]
EXPOSE 3000