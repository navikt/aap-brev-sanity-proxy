FROM gcr.io/distroless/nodejs20-debian12@sha256:d6a6cd8bd5ebf9b2d288c5388a640f271ad516a385c5b9adbcf6a7840d1b7ab2

ENV NODE_ENV production

COPY dist ./dist
COPY node_modules ./node_modules
COPY package.json .

CMD ["dist/src/index.js"]
