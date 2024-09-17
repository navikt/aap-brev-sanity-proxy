FROM node:20-alpine

ENV NODE_ENV production

COPY dist ./dist
COPY node_modules ./node_modules
COPY package.json .

CMD ["node", "dist/src/index.js"]
