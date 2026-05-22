# Monitoring Express (Prometheus + Grafana Notes)

This repo is a small Express app with Prometheus metrics. It is meant for learning and as a quick reference for setting up Prometheus (and later Grafana) to scrape app metrics.

## What is here

- Express server with `prom-client` at `/metrics`.
- Prometheus config in `prometheus.yml`.
- Prometheus container via `docker-compose.yml`.

## Project layout

- `src/index.js` - Express app and metrics endpoint.
- `prometheus.yml` - Prometheus scrape config.
- `docker-compose.yml` - Prometheus container setup.

## How it works

The app exposes metrics on `http://<host>:8080/metrics`. Prometheus scrapes that endpoint based on the `targets` list in `prometheus.yml`.

Current target in `prometheus.yml`:

Update this IP/host to match where your app is running.

## Run the app (local)

1. Install dependencies:

```
npm install
```

2. Start the server (simple run):

```
node src/index.js
```

3. Verify endpoints:

- `http://localhost:8080/data`
- `http://localhost:8080/metrics`

## Run Prometheus with Docker

1. Make sure `prometheus.yml` targets your app address.
2. Start Prometheus:

```
docker compose up
```

3. Open Prometheus UI:

- `http://localhost:9090`

## Grafana (notes)

Grafana is not in this compose file yet. You can add it later or run it separately. Typical steps:

1. Run Grafana container (example):

```
docker run -p 3000:3000 grafana/grafana
```

2. Open Grafana:

- `http://localhost:3000`

3. Add Prometheus as a data source:

- URL: `http://localhost:9090`

4. Build dashboards using Prometheus metrics from `/metrics`.

## Troubleshooting

- If Prometheus shows `down`, check the target host/port in `prometheus.yml`.
- If `docker compose up` fails on image pulls, retry or check network/proxy settings.
- Make sure the app is running before Prometheus starts scraping.

## Next ideas

- Add custom app metrics with `prom-client` (counters, histograms).
- Add Grafana to `docker-compose.yml`.

