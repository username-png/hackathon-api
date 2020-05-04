FROM python:3.6

ADD . /app
COPY . /app
WORKDIR /app

RUN \
  echo "deb https://deb.nodesource.com/node_12.x buster main" > /etc/apt/sources.list.d/nodesource.list && \
  wget -qO- https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list && \
  wget -qO- https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  apt-get update && \
  apt-get install -yqq nodejs yarn && \
  pip install -U pip && pip install pipenv && \
  npm i -g npm@^6 && \
  rm -rf /var/lib/apt/lists/* && \ 
  pwd && \
  ls && \
  pip install -r app/src/python_files/requirements.txt && \ 
  cd app && npm i --production && cd ..

ENV PRODUCTION true
ENV PRODUCTION true
ENV PASSWORD jCK1az7lx4zy9Jn1
ENV HOST /cloudsql/thematic-garage-276021:southamerica-east1:my-db
ENV DATABASE hackathon-db
ENV USER_DB postgres

EXPOSE 8080

CMD [ "node", "app/src/server.js" ]