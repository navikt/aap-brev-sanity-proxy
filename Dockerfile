FROM gcr.io/distroless/nodejs20-debian12@sha256:7a9dc35e49140e0d23e3c4e4855438d6ec66b1fdc106be451f52dfb982f39cac

ENV NODE_ENV production

COPY dist/index.cjs .

CMD ["index.cjs"]
