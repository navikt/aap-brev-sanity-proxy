FROM gcr.io/distroless/nodejs20-debian12@sha256:ae2408f9d8fe3e9c2f07af5d70c61cd66ad679ed4ff061eab65d6136d1741198

ENV NODE_ENV production

COPY dist/index.cjs .

CMD ["index.cjs"]
