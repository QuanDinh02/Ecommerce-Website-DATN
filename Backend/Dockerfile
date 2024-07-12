FROM node:18-alpine
# #chuẩn bị môi trường node.js, version node18/alpine

# Create app directory
WORKDIR /ecommerce/backend

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

RUN npm install -g @babel/core @babel/cli
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run build-src

EXPOSE 8080
CMD [ "npm","run", "build" ]

#docker build --tag node-docker .
# docker run -p 8080:8080 -d node-docker