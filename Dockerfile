FROM playwright/base

ENV NODE_ENV=production

ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

ARG NPM_LOGLEVEL=info

RUN yarn

CMD [ "node", "index.js" ]

EXPOSE 3000/tcp