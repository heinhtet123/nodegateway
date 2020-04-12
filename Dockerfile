# FROM node:carbon
FROM hein71290/nodegateway:latest
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./platform/package*.json ./


RUN npm install
# If you are building your code for production
# RUN npm install --only=production

COPY . /platform /usr/src/app/


RUN apt-get -y update
RUN apt-get install -y nano

EXPOSE 8080


# RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10

# RUN echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/mongodb.list




# RUN apt-get update && apt-get install -y mongodb-org


# start mongodb


# RUN dpkg-divert --local --rename --add /sbin/initctl
# # RUN ln -s /bin/true /sbin/initctl
# RUN dpkg-divert --local --rename --add /etc/init.d/mongod
# # RUN ln -s /bin/true /etc/init.d/mongod

# RUN \
# apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927 && \
# echo 'deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse' > /etc/apt/sources.list.d/mongodb.list && \
# apt-get update && \
# apt-get install -yq mongodb-org

# RUN mkdir -p /data/db
# # VOLUME ["/data/db"]

# # CMD [ "npm", "start","mongod"]
# end mongodb

CMD [ "npm", "start"]

