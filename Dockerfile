FROM gcr.io/distroless/nodejs20-debian12@sha256:7225b60942a630f1ce00f7abd95a0ce69b952a183b939ed093fa4a51eda14340

ENV NODE_ENV production

COPY dist/index.cjs .

CMD ["index.cjs"]
