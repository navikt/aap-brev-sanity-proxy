FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim@sha256:4127098f2e18faffd8b3a4ca5e68326268816032f829a2c1bf120ff51eab47b1

ENV NODE_ENV production

COPY dist/index.cjs .
COPY dist/index.cjs.map .

CMD ["--enable-source-maps", "index.cjs"]
