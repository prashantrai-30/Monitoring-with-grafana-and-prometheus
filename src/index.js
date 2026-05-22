const express = require('express');
const cors = require('cors');
const client = require('prom-client');

const app = express();
const port = 8080;

const collectDefaultMetrics = client.collectDefaultMetrics;

//create a registry which registers the metrices
const Registry = client.Registry;
const register = new Registry();

//collect default metrices
collectDefaultMetrics({ register });

app.use(cors());

app.get('/data', (req,res) => {
    res.json({
        message: "Hello from the server"
    });
})


app.get('/metrics', async (req,res) => {
    res.setHeader('Content-type', register.contentType);
    const metrics = await register.metrics();
    res.send(metrics);
})

app.listen(port, () => {
    console.log("app is listening on port:8080");
})