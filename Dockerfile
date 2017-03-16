#
# CloudBoost File-Ui Dockerfile
#

# Pull base image nodejs image.
FROM node:boron

#Maintainer.
MAINTAINER Ritish Gumber <ritishgumber@gmail.com>

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/


WORKDIR /opt/app
ADD . /opt/app

# Expose ports.
#   - 3012: CloudBoost File-ui
EXPOSE 3012

#Run the app
CMD [ "node", "server.js" ]
