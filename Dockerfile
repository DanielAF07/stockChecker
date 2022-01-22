FROM mcr.microsoft.com/playwright:bionic

RUN npm install

CMD [ "node", "index.js" ]

EXPOSE 3000/tcp