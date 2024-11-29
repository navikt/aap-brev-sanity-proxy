FROM gcr.io/distroless/nodejs20-debian12@sha256:598cdb15886f57783f69af23da995b16e0a13a0cdcc4f0721d1acb8c565513c5

ENV NODE_ENV production

COPY dist ./dist
COPY node_modules ./node_modules
COPY package.json .

CMD ["dist/src/index.js"]
