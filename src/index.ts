import express from "express";

const app = express();
app.use(express.json());

app.post("*", async function rootHandler(req, res) {
    const data = {
        headers: req.headers,
        body: req.body,
        query: req.query,
        path: req.path,
    };

    console.log(JSON.stringify(data, null, 2));

    res.sendStatus(202);
});

const appPort = 3001;
app.listen(appPort, () => {
    console.log(`listening on port ${appPort}`);
});

