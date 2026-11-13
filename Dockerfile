FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim@sha256:e4a09928bb07812969116696a9da5aba778f50952d3fee587acdabc292e1f457

ENV NODE_ENV production

COPY dist/index.cjs .
COPY dist/index.cjs.map .

CMD ["--enable-source-maps", "index.cjs"]
