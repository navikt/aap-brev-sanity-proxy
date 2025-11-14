FROM gcr.io/distroless/nodejs20-debian12@sha256:adce8f03e2b82454f0e36843879529ad8d2d1e6cc43ce26ff6124f04ab84a6cd

ENV NODE_ENV production

COPY dist/index.cjs .
COPY dist/index.cjs.map .

CMD ["--enable-source-maps", "index.cjs"]
