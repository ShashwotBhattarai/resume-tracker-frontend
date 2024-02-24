FROM node:18.19.0
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --ignore-scripts

# RUN addgroup --system nonroot && adduser --system --group nonroot
# USER nonroot

COPY ./src /usr/src/app/src
COPY ./public /usr/src/app/public
COPY ./jsconfig.json /user/src/app/jsconfig.json

EXPOSE 3001

CMD [ "npm", "start" ]
