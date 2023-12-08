FROM node:16

ENV api_port=3090
ENV apihost=localhost


WORKDIR /apis/retrogame/api

COPY package.json /

# RUN npm install

COPY .. /

EXPOSE 3090

CMD ["npm", "start"]