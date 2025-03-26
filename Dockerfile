FROM gcr.io/distroless/nodejs20-debian12@sha256:6848ce991f65e2ee8641b9c75d8d38b25d3bc45014b5dd6b31b736d152c8a0f8

ENV NODE_ENV production

COPY dist/index.cjs .

CMD ["index.cjs"]
