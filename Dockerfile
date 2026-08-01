FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim@sha256:aa7f78cd3087b9385c15204f5cdbbb1d4c4f28bcfcaa19b45c4e473fe8d1723a

ENV NODE_ENV production

COPY dist/index.cjs .
COPY dist/index.cjs.map .

CMD ["--enable-source-maps", "index.cjs"]
