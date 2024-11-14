FROM gcr.io/distroless/nodejs20-debian12@sha256:203bf034b174d1d5fd5522af197df29ed0956d2c72d9733ae75145f3f4c231bc

ENV NODE_ENV production

COPY dist ./dist
COPY node_modules ./node_modules
COPY package.json .

CMD ["dist/src/index.js"]
