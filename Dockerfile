FROM gcr.io/distroless/nodejs20-debian12@sha256:a6c0e95f6f70fb21586757a846d8b8d287609f2414bcc2399895adb055768648

ENV NODE_ENV production

COPY dist ./dist
COPY node_modules ./node_modules
COPY package.json .

CMD ["dist/src/index.js"]
