# aap-brev-sanity-proxy

## Hvordan teste lokalt

Lag en `.env` fil og legg inn følgende
```
SANITY_DATASET="production"
SANITY_PROJECT_ID="948n95rd"

SANITY_API_READ_TOKEN="<ditt token her>"
```

Kjør deretter `yarn install && yarn build && yarn dev`

### Testing av bygg lokalt

`yarn install && yarn build`

`docker build -t aap-brev-sanity-proxy-local-build .`

kopier verdi for `SANITY_API_READ_TOKEN` til clipboard

```
docker run -d --rm -p 8087:8087 \
    -e "SANITY_API_READ_TOKEN=`pbpaste`" \
    -e "SANITY_PROJECT_ID=948n95rd" \
    -e "SANITY_DATASET=production" \
    -e "NODE_ENV=development" \
    aap-brev-sanity-proxy-local-build:latest
```