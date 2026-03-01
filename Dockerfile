FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim@sha256:3f91e7593daf916b14f268acdfbbd3f3a7330d774caaca2ff872cd5035ba4c28

ENV NODE_ENV production

COPY dist/index.cjs .
COPY dist/index.cjs.map .

CMD ["--enable-source-maps", "index.cjs"]
