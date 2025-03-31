FROM gcr.io/distroless/nodejs20-debian12@sha256:989e64eefe820612d302e33ef79d2209798fc67535112e660b446f564d82c0bd

ENV NODE_ENV production

COPY dist/index.cjs .

CMD ["index.cjs"]
