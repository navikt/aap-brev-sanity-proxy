FROM gcr.io/distroless/nodejs20-debian12@sha256:9f43117c3e33c3ed49d689e51287a246edef3af0afed51a54dc0a9095b2b3ef9

ENV NODE_ENV production

COPY dist ./dist
COPY node_modules ./node_modules
COPY package.json .

CMD ["dist/src/index.js"]
