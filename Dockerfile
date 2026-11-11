FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim@sha256:a44ebcda34fba57f57699af61b92e61c807d820f05da2a3baff3cf6feba7e521

ENV NODE_ENV production

COPY dist/index.cjs .
COPY dist/index.cjs.map .

CMD ["--enable-source-maps", "index.cjs"]
