FROM gcr.io/distroless/nodejs20-debian12@sha256:55fcbc1b781606f4aa3587d3ee174a8acfc975b02a3ea252cef282895ac362d5

ENV NODE_ENV production

COPY dist/index.cjs .

CMD ["index.cjs"]
