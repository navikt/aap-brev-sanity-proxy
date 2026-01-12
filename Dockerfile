FROM gcr.io/distroless/nodejs20-debian12@sha256:773fe33b1b680078222dd0fe5cb37148ad512a8d68830feca4c10c93653f07f3

ENV NODE_ENV production

COPY dist/index.cjs .
COPY dist/index.cjs.map .

CMD ["--enable-source-maps", "index.cjs"]
