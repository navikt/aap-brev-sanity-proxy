FROM gcr.io/distroless/nodejs20-debian12@sha256:643437d5798d82253774d484d21ca75f5a64160061993f8171153f80bdea9f2e

ENV NODE_ENV production

COPY dist/index.cjs .

CMD ["index.cjs"]
