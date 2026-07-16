FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim@sha256:dd63e3809dd877a0019715dc32b0474bbb47c56c725248dd94aea497e1520eb4

ENV NODE_ENV production

COPY dist/index.cjs .
COPY dist/index.cjs.map .

CMD ["--enable-source-maps", "index.cjs"]
