## Build
FROM node:6.9
WORKDIR /work
COPY ./p2p-carsell-web/src src
COPY ./p2p-carsell-web/.angular-cli.json .angular-cli.json
COPY ./p2p-carsell-web/package.json package.json
COPY ./p2p-carsell-web/tsconfig.json tsconfig.json
COPY ./p2p-carsell-web/protractor.conf.js protractor.conf.js
RUN npm install && npm install http-server -g
RUN npm run build:local


EXPOSE 4200
ENTRYPOINT ["http-server","./dist","-p","4200","-a","0.0.0.0"]
