FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim@sha256:f4d5cef07bc6a5c5b37c3dd7a51cc73ebcfa927c7a0f161e86b08dbfa5dfbfe0

ENV NODE_ENV production

COPY dist/index.cjs .
COPY dist/index.cjs.map .

CMD ["--enable-source-maps", "index.cjs"]
