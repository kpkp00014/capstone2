FROM node:node:12.18.0 as builder
WORKDIR /app
COPY ./package.json ./
###########################################################################
# PYTHON:
###########################################################################

ARG INSTALL_PYTHON=false

RUN if [ ${INSTALL_PYTHON} = true ]; then \
    apt-get -y install python python2.7 python-pip python-dev build-essential  \
    && python -m pip install --upgrade pip  \
    && python -m pip install --upgrade virtualenv \
    ;fi

RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000 
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build  /usr/share/nginx/html