FROM gcr.io/distroless/nodejs20-debian12@sha256:ca63fa0ef17943773736ae933e1a65a47c6eaddcfbcef600f136df707f4bbc86

ENV NODE_ENV production

COPY dist ./dist
COPY node_modules ./node_modules
COPY package.json .

CMD ["dist/src/index.js"]
