FROM mcr.microsoft.com/playwright:bionic

RUN npm install --loglevel ${NPM_LOGLEVEL} --force

CMD [ "node", "index.js" ]

EXPOSE 3000/tcp