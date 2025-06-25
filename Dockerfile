FROM gcr.io/distroless/nodejs20-debian12@sha256:05c79ce75a5807df4b3dd73467135e153f51ce1ecafd2284d3a06434cc0fd025

ENV NODE_ENV production

COPY dist/index.cjs .

CMD ["index.cjs"]
