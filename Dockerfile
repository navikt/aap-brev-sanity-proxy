FROM gcr.io/distroless/nodejs20-debian12@sha256:12edf70828313a57d869cc1e26f7ca0291b3b69b7bd0a39de0399d4cf69809a3

ENV NODE_ENV production

COPY dist/index.cjs .

CMD ["index.cjs"]
