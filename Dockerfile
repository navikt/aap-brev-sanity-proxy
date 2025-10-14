FROM gcr.io/distroless/nodejs20-debian12@sha256:c7c8f7522975ed2334ba0d79381d1facdd107ddf88b52a40eed79de2d56174f9

ENV NODE_ENV production

COPY dist/index.cjs .

CMD ["index.cjs"]
