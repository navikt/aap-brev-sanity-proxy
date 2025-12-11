FROM gcr.io/distroless/nodejs20-debian12@sha256:7fff8fb4a6463da2765532290c958f7e6fc01d54d7539f0d2bda1e93c7636d7c

ENV NODE_ENV production

COPY dist/index.cjs .
COPY dist/index.cjs.map .

CMD ["--enable-source-maps", "index.cjs"]
